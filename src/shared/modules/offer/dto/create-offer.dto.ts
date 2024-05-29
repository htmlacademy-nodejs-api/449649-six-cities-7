import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

import { ECityName, EGoodType, EOfferType } from '../../../types/enums.js';
import { TLocation } from '../../../types/location.type.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(ECityName, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city: ECityName;

  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  public images: string[];

  public isPremium: boolean;
  public rating: number;

  @IsEnum(EOfferType, { message: CreateOfferValidationMessage.type.invalidFormat })
  public type: EOfferType;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  public bedrooms: number;

  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  public goods: EGoodType[];

  @IsMongoId({ message: CreateOfferValidationMessage.userId.invalidId})
  public userId: string;

  public numberOfComments: number;

  public location: TLocation;
}
