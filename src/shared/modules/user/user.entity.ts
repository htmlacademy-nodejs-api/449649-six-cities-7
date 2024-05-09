import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';

import { IUser } from '../../types/index.js';
import { EUserType } from '../../types/enums.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements IUser {
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
