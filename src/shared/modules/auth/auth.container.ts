import { Container } from 'inversify';

import { AuthService } from './auth-service.interface.js';
import { DefaultAuthService } from './default-auth.service.js';
import { Controller, ExceptionFilter } from '../../libs/rest/index.js';
import { EComponent } from '../../types/component.enum.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';
import { AuthController } from './auth.controller.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<AuthService>(EComponent.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(EComponent.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();
  authContainer.bind<Controller>(EComponent.AuthController).to(AuthController).inSingletonScope();

  return authContainer;
}
