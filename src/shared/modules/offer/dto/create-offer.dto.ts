import { IsArray, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';

import { ECityName, EGoodType, EOfferType } from '../../../types/enums.js';
import { TLocation } from '../../../types/location.type.js';
import { CREATE_UPDATE_OFFER_VALIDATION_MESSAGE } from './create-update-offer.messages.js';
import { MAX_BEDROOMS, MAX_DESCRIPTION_LENGTH, MAX_PRICE, MAX_TITLE_LENGTH, MIN_BEDROOMS, MIN_DESCRIPTION_LENGTH, MIN_PRICE, MIN_TITLE_LENGTH } from '../offer.constant.js';

export class CreateOfferDto {
  @MinLength(MIN_TITLE_LENGTH, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(MAX_TITLE_LENGTH, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title: string;

  @MinLength(MIN_DESCRIPTION_LENGTH, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(MAX_DESCRIPTION_LENGTH, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description: string;

  @IsDateString({}, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.POST_DATE.INVALID_FORMAT })
  public postDate: Date;

  @IsEnum(ECityName, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.CITY.INVALID_FORMAT })
  public city: ECityName;

  public isPremium: boolean;

  public isFavorite: boolean;

  @IsInt({ message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.RATING.INVALID_FORMAT })
  public rating: number;

  @IsEnum(EOfferType, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.TYPE.INVALID_FORMAT })
  public type: EOfferType;

  @IsInt({ message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.INVALID_FORMAT })
  public bedrooms: number;

  @Min(MIN_BEDROOMS, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MIN_VALUE })
  @Max(MAX_BEDROOMS, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MAX_VALUE })
  public maxAdults: number;

  @IsInt({ message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(MIN_PRICE, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(MAX_PRICE, { message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price: number;

  @IsArray({ message: CREATE_UPDATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT })
  public goods: EGoodType[];

  public userId: string;

  public numberOfComments: number;

  public location: TLocation;
}
