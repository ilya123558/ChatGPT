import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IUser } from '../../module/user/interfaces/user.interface';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): IUser => {
  return ctx.switchToHttp().getRequest().user;
});
