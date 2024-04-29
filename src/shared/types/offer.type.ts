import { TCity } from './city.type.js';
import { EGoodType, EOfferType } from './enums.js';
import { TLocation } from './location.type.js';
import { IUser } from './user.type.js';

export interface IOffer {
  id: string;
  title: string;
  description: string;
  postDate: Date;
  city: TCity;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
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
