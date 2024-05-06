import 'reflect-metadata';
import { Container } from 'inversify';

import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';
import { Config, RestConfig, RestSchema } from './shared/libs/config/index.js';
import { EComponent } from './shared/types/index.js';


async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(EComponent.RestApplication).to(RestApplication);
  container.bind<Logger>(EComponent.Logger).to(PinoLogger);
  container.bind<Config<RestSchema>>(EComponent.Config).to(RestConfig);

  const application = container.get<RestApplication>(EComponent.RestApplication);
  await application.init();
}

bootstrap();
