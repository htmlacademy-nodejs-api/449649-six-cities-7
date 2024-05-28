import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { UserService } from './user-service.interface.js';
import { EComponent } from '../../types/index.js';
import { DefaultUserService } from './default-user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { UserController } from './user.controller.js';
import { Controller } from '../../libs/rest/index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(EComponent.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(EComponent.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(EComponent.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
