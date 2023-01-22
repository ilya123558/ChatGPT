import { Controller, Get, Logger, NotFoundException, Param, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/components/decorators/get-user.decorator';
import { APP } from 'src/config/app.config';
import { CryptoUtil } from 'src/utils/crypto.util';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoUtil: CryptoUtil,
    private readonly logger: Logger
  ) {}

  @Get()
  @UseGuards(AuthGuard(APP.JWT))
  async getAuthorizeUser(@GetUser() user: IUser): Promise<IUser> {
    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  @Get('/nonce/:address')
  async getNonce(@Param('address') address: string): Promise<string> {
    if (!(await this.cryptoUtil.isAccountAddress(address))) {
      this.logger.error(`ACCOUNT_ADDRESS_WRONG_FORMAT: ${address}`);
      throw new UnauthorizedException('ACCOUNT_ADDRESS_WRONG_FORMAT');
    }

    const user = await this.userService.findByAddress(address);

    return user ? user.nonce : (await this.userService.create(address)).nonce;
  }
}
