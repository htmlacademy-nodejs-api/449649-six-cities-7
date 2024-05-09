import { Container } from 'inversify';

import { RestApplication } from './rest.application.js';
import { EComponent } from '../shared/types/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(EComponent.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(EComponent.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(EComponent.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(EComponent.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
}
