import { City } from './city.type.js';
import { GoodType } from './good-type.type.js';
import { Location } from './location.type.js';
import { OfferType } from './offer-type.type.js';
import { User } from './user.type.js';

export type Offer = {
  id: string;
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: GoodType[];
  user: User;
  numberOfComments: number;
  location: Location;
};
