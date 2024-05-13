import { defaultClasses, getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose';

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
  @prop({required: true, trim: true, unique: true})
  public name: string;

  @prop({ required: true, LocationEntity })
  public location: TLocation;

  @prop({required: true, ref: LocationEntity})
  public locationId: Ref<LocationEntity>;

  constructor(cityData: TCity, locationId: Ref<LocationEntity>) {
    super();

    this.name = cityData.name;
    this.location = cityData.location;
    this.locationId = locationId;
  }
}

export const CityModel = getModelForClass(CityEntity);
