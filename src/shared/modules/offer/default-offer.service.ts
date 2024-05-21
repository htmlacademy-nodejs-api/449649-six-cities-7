import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { OfferService } from './offer.service.interface.js';
import { EComponent } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async findByOfferName(offerName: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findOne({ name: offerName }).exec();
  }

  public async findOffersByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ city }).exec();
  }

  public async findOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ userId }).exec();
  }

  public async findByOfferNameOrCreate(offerName: string, createOfferDto: CreateOfferDto,): Promise<DocumentType<OfferEntity>> {
    return (await this.findByOfferName(offerName)) || (await this.create(createOfferDto));
  }

  public async update(offerId: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).exec();
  }

  public async delete(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }
}
