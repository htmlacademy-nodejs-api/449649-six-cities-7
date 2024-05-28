import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { OfferService } from './offer.service.interface.js';
import { EComponent } from '../../types/component.enum.js';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { OfferController } from './offer.controller.js';
import { Controller } from '../../libs/rest/index.js';

export function createOfferContainer(): Container {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(EComponent.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(EComponent.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(EComponent.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
