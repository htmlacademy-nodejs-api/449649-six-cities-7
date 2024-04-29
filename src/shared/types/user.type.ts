import { EUserType } from './enums.js';

export interface IUser {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  type: EUserType;
}
