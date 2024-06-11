import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

import { IUser } from '../../types/index.js';
import { EUserType } from '../../types/enums.js';
import { createSHA256 } from '../../helpers/index.js';
import { DEFAULT_AVATAR_FILE_NAME } from './user.constant.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements IUser {
  @prop({ required: true, trim: true, default: '' })
  public name: string;

  @prop({ required: true, trim: true, unique: true })
  public email: string;

  @prop({ required: false, trim: true, default: DEFAULT_AVATAR_FILE_NAME })
  public avatarPath: string;

  @prop({ required: true, type: () => String, enum: EUserType })
  public type: EUserType;

  @prop({ required: true, trim: true })
  private password?: string;

  constructor(userData: IUser) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    return createSHA256(password, salt) === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
