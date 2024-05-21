import { ECityName, EGoodType, EOfferType } from '../../../types/enums.js';
import { TLocation } from '../../../types/location.type.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: ECityName;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public rating: number;
  public type: EOfferType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: EGoodType[];
  public numberOfComments: number;
  public userId: string;
  public location: TLocation;
}
