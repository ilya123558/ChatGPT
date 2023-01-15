import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { IUser } from '../../user/interfaces/user.interface';
import { TokenService } from '../../token/token.service';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['access_token'];
          if (!data) return null;
          return data;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, user: Partial<IUser>) {
    const token = req.cookies?.access_token;
    const tokenExists = await this.tokenService.exists(user._id.toString(), token);
    const userByToken = tokenExists ? await this.userService.findById(user._id.toString()) : null;

    if (userByToken) {
      return userByToken;
    } else {
      this.authService.clearJWTCookie(req.res);
      throw new UnauthorizedException();
    }
  }
}
