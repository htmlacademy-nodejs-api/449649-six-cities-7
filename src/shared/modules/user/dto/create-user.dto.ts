import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';

import { CreateUserMessages } from './create-user.messages.js';
import { EUserType } from '../../../types/enums.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.required })
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.avatarPath.required })
  @Matches(/(\.jpg|\.png)$/, { message: CreateUserMessages.avatarPath.invalidFormat })
  public avatarPath: string;

  @IsString({ message: CreateUserMessages.type.required })
  @IsEnum(EUserType, { message: CreateUserMessages.type.invalidFormat })
  public type: EUserType;

  @IsString({ message: CreateUserMessages.password.required })
  @MinLength(6, { message: CreateUserMessages.password.minLength })
  @MaxLength(12, { message: CreateUserMessages.password.maxLength })
  public password: string;
}
