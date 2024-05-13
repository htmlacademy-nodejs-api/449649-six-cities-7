import { DocumentType } from '@typegoose/typegoose';
import { CityEntity } from './city.entity.js';
import { TCity } from '../../types/city.type.js';

export interface CityService {
  findCityorCreate(cityData: TCity): Promise<DocumentType<CityEntity>>;
  findCityById(id: string): Promise<DocumentType<CityEntity> | null>;
  findCityByName(cityName: string): Promise<DocumentType<CityEntity> | null>;
}
