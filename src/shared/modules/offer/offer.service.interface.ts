import { DocumentType } from '@typegoose/typegoose';

import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

export interface OfferService {
  create(createOfferDto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  getPremiumOffers(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, createOfferDto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deletebyId(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  getRating(offerId: string): Promise<number | null>;
  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
