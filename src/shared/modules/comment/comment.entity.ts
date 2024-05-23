import { UserEntity } from '../user/index.js';
import { OfferEntity } from '../offer/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'reviews',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true })
  public text: string;

  @prop({ required: true })
  public rating: number;

  @prop({ required: true, ref: () => OfferEntity })
  public offerId: Ref<OfferEntity>;

  @prop({ required: true, ref: () => UserEntity })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
