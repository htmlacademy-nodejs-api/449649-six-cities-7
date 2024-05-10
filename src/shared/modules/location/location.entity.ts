import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

import { TLocation } from '../../types/location.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface LocationEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'locations',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class LocationEntity extends defaultClasses.TimeStamps implements TLocation {
  @prop({ required: true })
  public latitude: number;

  @prop({ required: true })
  public longitude: number;

  constructor(locationData: TLocation) {
    super();

    this.latitude = locationData.latitude;
    this.longitude = locationData.longitude;
  }
}

export const LocationModel = getModelForClass(LocationEntity);

