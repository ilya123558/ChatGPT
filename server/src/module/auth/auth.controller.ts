import { Body, Controller, Delete, Post, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import * as _ from 'lodash';

import { AuthService } from './auth.service';
import { ExtensionAuthDto } from './dto/extension-auth.dto';
import { IUser } from '../user/interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/components/decorators/get-user.decorator';
import { APP } from 'src/config/app.config';
import { UserSerializer } from '../user/serializers/user.serializer';
import { UserSerializedDto } from '../user/dto/user-serialized.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userSerializer: UserSerializer) {}

  @Post('/extension')
  async extensionWalletAuth(
    @Body(new ValidationPipe({ whitelist: true })) extensionAuthDto: ExtensionAuthDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<UserSerializedDto> {
    const extensionAuthResponse = await this.authService.extensionWalletAuth(extensionAuthDto);

    const user = extensionAuthResponse.user;
    this.authService.addJWTCookie(user.accessToken, res);

    return this.userSerializer.serialize(user);
  }

  @Delete('/logout')
  @UseGuards(AuthGuard(APP.JWT))
  async logout(@GetUser() user: IUser, @Res({ passthrough: true }) res: Response): Promise<boolean> {
    this.authService.clearJWTCookie(res);

    return await this.authService.logout(String(user._id));
  }
}
