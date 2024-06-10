import { Container } from 'inversify';

import { RestApplication } from './rest.application.js';
import { EComponent } from '../shared/types/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { AppExceptionFilter, ExceptionFilter, ValidationExceptionFilter } from '../shared/libs/rest/index.js';
import { HttpErrorExceptionFilter } from '../shared/libs/rest/exception-filter/http-error.exception-filter.js';
import { PathTransformer } from '../shared/libs/rest/transform/path-transformer.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(EComponent.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(EComponent.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(EComponent.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(EComponent.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(EComponent.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(EComponent.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(EComponent.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(EComponent.PathTransformer).to(PathTransformer).inSingletonScope();

  return restApplicationContainer;
}
