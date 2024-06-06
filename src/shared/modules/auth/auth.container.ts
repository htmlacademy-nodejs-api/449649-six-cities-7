import { Container } from 'inversify';

import { AuthService } from './auth-service.interface.js';
import { DefaultAuthService } from './default-auth.service.js';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { EComponent } from '../../types/component.enum.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<AuthService>(EComponent.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(EComponent.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
