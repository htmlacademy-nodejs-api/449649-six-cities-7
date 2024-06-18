import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { TLocation } from '../../types/location.type.js';
import { ECityName, EGoodType, EOfferType } from '../../types/enums.js';
import { Types } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public title: string;

  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public postDate: Date;

  @prop({
    required: true,
    type: () => String,
    enum: ECityName,
  })
  public city: ECityName;

  @prop({ required: true, type: String })
  public previewImage: string;

  @prop({ required: true })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({ required: true, type: () => String, enum: EOfferType })
  public type: EOfferType;

  @prop({ required: true, min: 1, max: 8 })
  public bedrooms: number;

  @prop({ required: true, min: 1, max: 10 })
  public maxAdults: number;

  @prop({ required: true })
  public price: number;

  @prop({
    required: true,
    type: () => Array<string>
  })
  public goods: EGoodType[];

  @prop({ required: true, ref: UserEntity })
  public userId: Ref<UserEntity>;

  @prop({ required: false })
  public numberOfComments: number;

  @prop({ required: true })
  public location: TLocation;

  @prop({ type: Types.ObjectId, required: true, default: [] })
  public favorites: Types.Array<Types.ObjectId>;
}

export const OfferModel = getModelForClass(OfferEntity);
