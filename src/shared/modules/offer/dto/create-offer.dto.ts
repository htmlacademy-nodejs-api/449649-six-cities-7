import { IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';

import { ECityName, EGoodType, EOfferType } from '../../../types/enums.js';
import { TLocation } from '../../../types/location.type.js';
import { CREATE_UPDATE_OFFER_VALIDATION_MESSAGE } from './create-update-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(100, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title: string;

  @MinLength(20, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(1024, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description: string;

  @IsDateString({}, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.POST_DATE.INVALID_FORMAT })
  public postDate: Date;

  @IsEnum(ECityName, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.CITY.INVALID_FORMAT })
  public city: ECityName;

  public isPremium: boolean;

  @IsInt({ message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.RATING.INVALID_FORMAT })
  public rating: number;

  @IsEnum(EOfferType, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.TYPE.INVALID_FORMAT })
  public type: EOfferType;

  @IsInt({ message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.INVALID_FORMAT })
  public bedrooms: number;

  @Min(1, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MIN_VALUE })
  @Max(8, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MAX_VALUE })
  public maxAdults: number;

  @IsInt({ message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(100, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(100000, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price: number;

  @IsArray({ message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT })
  public goods: EGoodType[];

  public userId: string;

  public numberOfComments: number;

  public location: TLocation;
}
