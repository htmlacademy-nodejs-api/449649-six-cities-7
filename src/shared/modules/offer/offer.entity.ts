import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { validateCity, validateGoodType, validateOfferType } from './offer-helper.js';
import { UserEntity } from '../user/user.entity.js';
import { CityEntity } from '../city/city.entity.js';
import { LocationEntity } from '../location/location.entity.js';
import { TCity } from '../../types/city.type.js';
import { IUser } from '../../types/user.type.js';
import { TLocation } from '../../types/location.type.js';
import { IOffer } from '../../types/offer.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: 10, maxlength: 100})
  public title: string;

  @prop({ required: true, minlength: 20, maxlength: 1024})
  public description: string;

  @prop({ required: true })
  public postDate: Date;

  @prop({
    ref: CityEntity,
    required: true,
    validate: {
      validator: validateCity,
      message: 'Invalid city name'
    },
  })
  public cityId: Ref<CityEntity>;

  public city: TCity;

  @prop({ required: true, type: String})
  public previewImage: string;

  @prop({
    required: true,
    type: String,
    default: [],
    validate: {
      validator: (v: string[]) => v.length === 6,
      message: 'Images array must contain exactly 6 elements'
    },
  })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({
    required: true,
    validate: {
      validator: (v: number) => v >= 1 && v <= 5 && Number.isInteger(v * 10),
      message: 'Rating must be a number from 1 to 5 with one decimal place allowed'
    },
  })
  public rating: number;

  @prop({
    required: true,
    validate: {
      validator: validateOfferType,
      message: 'Invalid '
    },
  })
  public type: string;

  @prop({ required: true, min: 1, max: 8})
  public bedrooms: number;

  @prop({ required: true, min: 1, max: 10})
  public maxAdults: number;

  @prop({ required: true, min: 100, max: 100000})
  public price: number;

  @prop({
    required: true,
    validate: {
      validator: validateGoodType,
      message: 'Invalid good type'
    }})
  public goods: string[];

  @prop({required: true, ref: UserEntity})
  public userId: Ref<UserEntity>;

  public user: IUser;

  @prop({ required: false })
  public numberOfComments: number;

  @prop({ required: true, ref: LocationEntity })
  public locationId!: Ref<LocationEntity>;

  public location: TLocation;

  constructor(
    offerData: IOffer,
    cityId: Ref<CityEntity>,
    userId: Ref<UserEntity>,
    locationId: Ref<LocationEntity>
  ) {
    super();
    this.title = offerData.title;
    this.description = offerData.description;
    this.postDate = offerData.postDate;
    this.city = offerData.city;
    this.cityId = cityId;
    this.previewImage = offerData.previewImage;
    this.images = offerData.images;
    this.isPremium = offerData.isPremium;
    this.isFavorite = offerData.isFavorite;
    this.rating = offerData.rating;
    this.type = offerData.type;
    this.bedrooms = offerData.bedrooms;
    this.maxAdults = offerData.maxAdults;
    this.price = offerData.price;
    this.goods = offerData.goods;
    this.user = offerData.user;
    this.userId = userId;
    this.numberOfComments = offerData.numberOfComments;
    this.location = offerData.location;
    this.locationId = locationId;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
