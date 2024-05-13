import { TCity } from '../../../types/city.type.js';
import { EGoodType, EOfferType } from '../../../types/enums.js';
import { TLocation } from '../../../types/location.type.js';
import { IUser } from '../../../types/user.type.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: TCity;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: EOfferType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: EGoodType[];
  public numberOfComments: number;
  public user: IUser;
  public location: TLocation;
}
