import { DocumentType } from '@typegoose/typegoose';

import { LocationEntity } from './location.entity.js';
import { CreateLocationDto } from './dto/create-location.dto.js';

export interface LocationService {
  create(createLocationDto: CreateLocationDto): Promise<DocumentType<LocationEntity>>;
  getAllLocations(): Promise<DocumentType<LocationEntity>[]>;
  update(id: string, createLocationDto: CreateLocationDto): Promise<DocumentType<LocationEntity> | null>;
  delete(id: string): Promise<DocumentType<LocationEntity> | null>;
}
