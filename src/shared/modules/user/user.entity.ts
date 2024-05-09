import { EUserType } from '../../types/enums.js';
import { IUser } from '../../types/index.js';

export class UserEntity implements IUser {
  public name: string;
  public email: string;
  public avatarPath: string;
  public password: string;
  public type: EUserType;
}
