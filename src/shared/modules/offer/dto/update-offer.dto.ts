import { IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

import { ECityName, EGoodType, EOfferType } from '../../../types/enums.js';
import { TLocation } from '../../../types/location.type.js';
import { CreateUpdateOfferValidationMessage } from './create-update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateUpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateUpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateUpdateOfferValidationMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(ECityName, { message: CreateUpdateOfferValidationMessage.city.invalidFormat })
  public city?: ECityName;

  @IsOptional()
  public previewImage?: string;

  @IsOptional()
  @IsString({ message: CreateUpdateOfferValidationMessage.images.invalidFormat })
  public images?: string[];

  @IsOptional()
  public isPremium?: boolean;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferValidationMessage.rating.invalidFormat })
  public rating?: number;

  @IsOptional()
  @IsEnum(EOfferType, { message: CreateUpdateOfferValidationMessage.type.invalidFormat })
  public type?: EOfferType;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferValidationMessage.bedrooms.invalidFormat })
  public bedrooms?: number;

  @IsOptional()
  @Min(1, { message: CreateUpdateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateUpdateOfferValidationMessage.bedrooms.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsEnum(EGoodType, { each: true, message: CreateUpdateOfferValidationMessage.goods.invalidFormat })
  public goods?: EGoodType[];

  @IsOptional()
  @IsMongoId({ message: CreateUpdateOfferValidationMessage.userId.invalidId })
  public userId?: string;

  @IsOptional()
  public numberOfComments?: number;

  @IsOptional()
  public location?: TLocation;
}
