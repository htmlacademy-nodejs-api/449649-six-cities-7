import { inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { CityService } from './city.service.interface.js';
import { EComponent } from '../../types/component.enum.js';
import { CityEntity } from './city.entity.js';
import { Logger } from 'pino';
import { CreateCityDto } from './dto/create-city.dto.js';


export class DefaultCityService implements CityService {
  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`New city created: ${dto.name}`);
    return result;
  }

  async findCityById(id: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(id);
  }

  async findCityByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name });
  }

  async findCityByNameorCreate(name: string, dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findCityByName(name);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }

  async getAllCities(): Promise<DocumentType<CityEntity>[]> {
    return this.cityModel.find();
  }

  async update(id: string, createCityDto: CreateCityDto): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findByIdAndUpdate(id, createCityDto, { new: true });
  }

  async delete(id: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findByIdAndDelete(id);
  }
}
