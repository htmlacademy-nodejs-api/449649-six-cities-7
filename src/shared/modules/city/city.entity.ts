import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';

import { TCity } from '../../types/city.type.js';
import { TLocation } from '../../types/location.type.js';
import { LocationEntity } from '../location/location.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps implements TCity {
  @prop({ required: true })
  public name: string;

  @prop({ required: true, type: () => LocationEntity })
  public location: TLocation;

  constructor(cityData: TCity) {
    super();

    this.name = cityData.name;
    this.location = cityData.location;
  }
}

export const CityModel = getModelForClass(CityEntity);
