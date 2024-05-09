import { Container } from 'inversify';

import { UserService } from './user-service.interface.js';
import { EComponent } from '../../types/index.js';
import { DefaultUserService } from './default-user.service.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(EComponent.UserService).to(DefaultUserService).inSingletonScope();

  return userContainer;
}
