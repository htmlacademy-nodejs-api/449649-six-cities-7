import { Schema, Document, model } from 'mongoose';
import { IUser } from '../../types/index.js';
import { EUserType } from '../../types/enums.js';

export interface UserDocument extends IUser, Document {}

const userSchema = new Schema({
  name: String,
  email: String,
  avatarPath: String,
  password: String,
  type: EUserType,
});

export const UserModel = model<UserDocument>('User', userSchema);
