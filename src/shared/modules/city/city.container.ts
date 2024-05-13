import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { EComponent } from '../../types/component.enum.js';
import { CityService } from './city.service.interface.js';
import { DefaultCityService } from './default-city.service.js';
import { CityEntity, CityModel } from './city.entity.js';

export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer.bind<CityService>(EComponent.CityService).to(DefaultCityService);
  cityContainer.bind<types.ModelType<CityEntity>>(EComponent.CityModel).toConstantValue(CityModel);

  return cityContainer;
}
