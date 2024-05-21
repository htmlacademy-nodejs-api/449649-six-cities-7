import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { OfferService } from './offer.service.interface.js';
import { EComponent } from '../../types/component.enum.js';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';

export function createOfferContainer(): Container {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(EComponent.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(EComponent.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
