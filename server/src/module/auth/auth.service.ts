import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { addOneDay } from 'src/utils/date.util';
import { TokenService } from '../token/token.service';
import { IReadableUser } from '../user/interfaces/readable-user.interface';
import { IUser } from '../user/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { ExtensionAuthDto } from './dto/extension-auth.dto';
import { IOauthResponse } from './interfaces/oauth-response.interface';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async extensionWalletAuth(data: ExtensionAuthDto): Promise<IOauthResponse> {
    let user = await this.userService.findByAddress(data.address);

    if (!user) {
      user = await this.userService.create(data.address);
    }

    return { user: await this.getLoggedInUser(user) };
  }

  async logout(userId: string): Promise<boolean> {
    await this.tokenService.deleteAll(userId);

    return true;
  }

  addJWTCookie(token: string, res: Response): void {
    res.cookie('access_token', token, {
      httpOnly: true,
      expires: addOneDay().toDate(),
      sameSite: 'none',
      secure: true,
    });
  }

  clearJWTCookie(res: Response): void {
    res.clearCookie('access_token');
  }

  private async getLoggedInUser(user: IUser): Promise<IReadableUser> {
    const token = await this.getUserToken(user);
    const readableUser = user.toObject() as IReadableUser;

    readableUser.accessToken = token;

    return readableUser;
  }

  private async getUserToken(user: IUser): Promise<string> {
    const tokenPayload: ITokenPayload = {
      _id: String(user._id),
      address: user.address,
    };

    const token = await this.generateToken(tokenPayload);
    const expireAt = addOneDay().toISOString();

    await this.saveToken({
      token,
      expireAt,
      user: user._id,
    });

    return token;
  }

  private async generateToken(data: ITokenPayload): Promise<string> {
    return this.jwtService.sign(data);
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    return this.tokenService.create(createUserTokenDto);
  }
}
