import { Injectable } from '@nestjs/common';

import { UserSerializedDto } from '../dto/user-serialized.dto';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserSerializer {
  public serialize(entity: IUser): UserSerializedDto {
    return {
      _id: entity._id?.toString(),
      address: entity.address,
      name: entity.name,
    };
  }

  public serializeCollection(users: IUser[]): UserSerializedDto[] {
    return users.map(user => this.serialize(user.toObject()));
  }
}
