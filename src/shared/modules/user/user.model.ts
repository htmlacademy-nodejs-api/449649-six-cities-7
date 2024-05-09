import { Schema, Document, model } from 'mongoose';
import { IUser } from '../../types/index.js';
import { EUserType } from '../../types/enums.js';

export interface UserDocument extends IUser, Document {
  createdAt: Date,
  updatedAt: Date
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Min length for firstname is 2']
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true
  },
  avatarPath: {
    type: String,
    required: true,
    minlength: [5, 'Min length for avatar path is 5'],
  },
  password: String,
  type: EUserType,
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
