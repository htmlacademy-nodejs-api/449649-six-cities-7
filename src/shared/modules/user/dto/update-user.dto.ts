import { EUserType } from '../../../types/enums.js';

export class UpdateUserDto {
  public name?: string;
  public password?: string;
  public email?: string;
  public type?: EUserType;
  public avatarPath?: string;
}
