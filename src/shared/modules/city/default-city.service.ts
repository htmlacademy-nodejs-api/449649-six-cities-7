import { CityService } from './city.service.interface.js';
import { CityEntity } from './city.entity.js';
import { TCity } from '../../types/city.type.js';
import { EComponent } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import { LocationService } from '../location/location.service.interface.js';

@injectable()
export class DefaultCityService implements CityService {
  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.CityModel) private readonly cityModel: types.ModelType<CityEntity>,
    @inject(EComponent.LocationService) private readonly locationService: LocationService,
  ) {}

  private async create(cityData: TCity): Promise<DocumentType<CityEntity>> {
    const {location: locationData} = cityData;
    const location = await this.locationService.findLocationOrCreate(locationData);

    const city = new CityEntity(cityData, location.id);
    const result = await this.cityModel.create(city);
    this.logger.info(`New city created: ${city.name}`);

    return result;
  }

  public async findCityorCreate(cityData: TCity): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findCityByName(cityData.name);

    if (existedCity) {
      return existedCity;
    }

    return this.create(cityData);
  }

  public async findCityById(cityId: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId);
  }

  public async findCityByName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({name: cityName});
  }
}
