import { ECityName, EGoodType, EOfferType } from './enums.js';
import { TLocation } from './location.type.js';
import { IUser } from './user.type.js';

export interface IOffer {
  title: string;
  description: string;
  postDate: Date;
  city: ECityName;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: EOfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: EGoodType[];
  user: IUser;
  numberOfComments: number;
  location: TLocation;
}
