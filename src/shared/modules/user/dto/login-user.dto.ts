import { IsEmail, IsString, Length } from 'class-validator';

import { CREATE_LOGIN_USER_MESSAGE } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: CREATE_LOGIN_USER_MESSAGE.EMAIL.INVALID_FORMAT })
  public email: string;

  @IsString({ message: CREATE_LOGIN_USER_MESSAGE.PASSWORD.INVALID_FORMAT })
  @Length(6, 12, { message: CREATE_LOGIN_USER_MESSAGE.PASSWORD.LENGTH_FIELD })
  public password: string;
}
