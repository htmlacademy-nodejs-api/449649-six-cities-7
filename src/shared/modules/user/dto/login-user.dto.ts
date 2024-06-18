import { IsEmail, IsString, Length } from 'class-validator';

import { CREATE_LOGIN_USER_MESSAGE } from './login-user.messages.js';
import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '../user.constant.js';

export class LoginUserDto {
  @IsEmail({}, { message: CREATE_LOGIN_USER_MESSAGE.EMAIL.INVALID_FORMAT })
  public email: string;

  @IsString({ message: CREATE_LOGIN_USER_MESSAGE.PASSWORD.INVALID_FORMAT })
  @Length(MIN_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD, { message: CREATE_LOGIN_USER_MESSAGE.PASSWORD.LENGTH_FIELD })
  public password: string;
}
