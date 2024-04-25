import { User } from './user.type.js';

export type Comment = {
  id: string;
  text: string;
  createdDate: Date;
  rating: number;
  user: User;
}
