import { Body, Controller, Post, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { ExtensionAuthDto } from './dto/extension-auth.dto';
import { IUser } from '../user/interfaces/user.interface';
import { IReadableUser } from '../user/interfaces/readable-user.interface';
import { GetUser } from 'src/components/decorators/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/extension')
  async extensionWalletAuth(
    @Body(new ValidationPipe({ whitelist: true })) extensionAuthDto: ExtensionAuthDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IUser> {
    const extensionAuthResponse = await this.authService.extensionWalletAuth(extensionAuthDto);

    const user = extensionAuthResponse.user;
    this.authService.addJWTCookie(user.accessToken, res);

    return user;
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@GetUser() user: IReadableUser, @Res({ passthrough: true }) res: Response): Promise<boolean> {
    this.authService.clearJWTCookie(res);

    return await this.authService.logout(String(user._id));
  }
}
