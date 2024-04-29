import { IUser } from './user.type.js';

export interface IReview {
  id: string;
  comment: string;
  createdDate: Date;
  rating: number;
  user: IUser;
}
