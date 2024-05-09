import { getModelForClass, prop } from '@typegoose/typegoose';

import { IUser } from '../../types/index.js';
import { EUserType } from '../../types/enums.js';

export class UserEntity implements IUser {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarPath: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: true })
  public type: EUserType;
}

export const UserModel = getModelForClass(UserEntity);
