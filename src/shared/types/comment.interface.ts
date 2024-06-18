import { IUser } from './user.interface.js';

export interface IComment {
  comment: string;
  createdDate: Date;
  rating: number;
  user: IUser;
}
