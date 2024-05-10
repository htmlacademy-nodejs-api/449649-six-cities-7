import { DocumentType } from '@typegoose/typegoose';

import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

export interface OfferService {
  create(createOfferDto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findOfferById(id: string): Promise<DocumentType<OfferEntity> | null>;
  findOffersByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  findOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]>;
  getAllOffers(): Promise<DocumentType<OfferEntity>[]>;
  update(id: string, createOfferDto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  delete(id: string): Promise<DocumentType<OfferEntity> | null>;
}
