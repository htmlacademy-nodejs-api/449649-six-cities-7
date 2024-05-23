import { DocumentType } from '@typegoose/typegoose';

import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

export interface OfferService {
  create(createOfferDto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findOfferById(offerId: string, count?: number): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  findPremiumOffers(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, createOfferDto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deletebyId(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
