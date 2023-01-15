import { Controller, Get, Logger, Param, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CryptoUtil } from 'src/utils/crypto.util';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoUtil: CryptoUtil,
    private readonly logger: Logger
  ) {}

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
