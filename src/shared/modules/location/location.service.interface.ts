import { DocumentType } from '@typegoose/typegoose';

import { LocationEntity } from './location.entity.js';
import { TLocation } from '../../types/location.type.js';

export interface LocationService {
  findLocationOrCreate(locationData: TLocation): Promise<DocumentType<LocationEntity>>;
  findLocationById(id: number): Promise<DocumentType<LocationEntity> | null>;
  findLocationByCoordinates(cityLongitude: number, cityLatitude: number): Promise<DocumentType<LocationEntity> | null>;
}
