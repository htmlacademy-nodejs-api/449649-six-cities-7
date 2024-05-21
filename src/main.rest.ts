import 'reflect-metadata';
import { Container } from 'inversify';

import { RestApplication } from './rest/index.js';
import { EComponent } from './shared/types/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );

  const application = appContainer.get<RestApplication>(EComponent.RestApplication);
  await application.init();
}

bootstrap();
