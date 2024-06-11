import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

import { CREATE_USER_MESSAGES } from './create-user.messages.js';
import { EUserType } from '../../../types/enums.js';

export class CreateUserDto {
  @IsString({ message: CREATE_USER_MESSAGES.NAME.REQUIRED })
  public name: string;

  @IsEmail({}, { message: CREATE_USER_MESSAGES.EMAIL.INVALID_FORMAT })
  public email: string;

  @IsString({ message: CREATE_USER_MESSAGES.TYPE.REQUIRED })
  @IsEnum(EUserType, { message: CREATE_USER_MESSAGES.TYPE.INVALID_FORMAT })
  public type: EUserType;

  @IsString({ message: CREATE_USER_MESSAGES.PASSWORD.REQUIRED })
  @MinLength(6, { message: CREATE_USER_MESSAGES.PASSWORD.MIN_LENGTH })
  @MaxLength(12, { message: CREATE_USER_MESSAGES.PASSWORD.MAX_LENGTH })
  public password: string;
}
