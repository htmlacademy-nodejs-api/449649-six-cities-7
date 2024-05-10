import { DocumentType } from '@typegoose/typegoose';

import { CityEntity } from './city.entity.js';
import { CreateCityDto } from './dto/create-city.dto.js';

export interface CityService {
  create(createCityDto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findCityById(id: string): Promise<DocumentType<CityEntity> | null>;
  findCityByName(name: string): Promise<DocumentType<CityEntity> | null>;
  findCityByNameorCreate(name: string): Promise<DocumentType<CityEntity>>;
  getAllCities(): Promise<DocumentType<CityEntity>[]>;
  update(id: string, createCityDto: CreateCityDto): Promise<DocumentType<CityEntity> | null>;
  delete(id: string): Promise<DocumentType<CityEntity> | null>;
}
