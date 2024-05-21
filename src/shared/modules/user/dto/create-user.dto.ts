import { EUserType } from '../../../types/enums.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarPath: string;
  public type: EUserType;
  public password: string;
}
