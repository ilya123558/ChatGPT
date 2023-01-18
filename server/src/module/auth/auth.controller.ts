import { Body, Controller, Delete, Post, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { ExtensionAuthDto } from './dto/extension-auth.dto';
import { IUser } from '../user/interfaces/user.interface';
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

  @Delete('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@Body() userId: string, @Res({ passthrough: true }) res: Response): Promise<boolean> {
    this.authService.clearJWTCookie(res);

    return await this.authService.logout(userId);
  }
}
