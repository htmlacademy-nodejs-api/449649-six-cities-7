import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

import { ECityName, EGoodType, EOfferType } from '../../../types/enums.js';
import { TLocation } from '../../../types/location.type.js';
import { CreateUpdateOfferValidationMessage } from './create-update-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateUpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateUpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateUpdateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(ECityName, { message: CreateUpdateOfferValidationMessage.city.invalidFormat })
  public city: ECityName;

  public previewImage: string;

  @IsArray({ message: CreateUpdateOfferValidationMessage.images.invalidFormat })
  public images: string[];

  public isPremium: boolean;

  @IsInt({ message: CreateUpdateOfferValidationMessage.rating.invalidFormat })
  public rating: number;

  @IsEnum(EOfferType, { message: CreateUpdateOfferValidationMessage.type.invalidFormat })
  public type: EOfferType;

  @IsInt({ message: CreateUpdateOfferValidationMessage.bedrooms.invalidFormat })
  public bedrooms: number;

  @Min(1, { message: CreateUpdateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateUpdateOfferValidationMessage.bedrooms.maxValue })
  public maxAdults: number;

  @IsInt({ message: CreateUpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateUpdateOfferValidationMessage.goods.invalidFormat })
  public goods: EGoodType[];

  @IsMongoId({ message: CreateUpdateOfferValidationMessage.userId.invalidId})
  public userId: string;

  public numberOfComments: number;

  public location: TLocation;
}
