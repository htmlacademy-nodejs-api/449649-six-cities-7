import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { OfferService } from './offer.service.interface.js';
import { EComponent } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_OFFER_PREMIUM_COUNT } from './offer.constant.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';

const addReviewsToOffer = [
  {
    $lookup: {
      from: 'reviews',
      localField: '_id',
      foreignField: 'offerId',
      as: 'reviews',
    }
  },
  {
    $addFields: {
      reviewCount: { $size: '$reviews' },
      rating: { $avg: '$reviews.rating' },
    }
  },
  {
    $unset: 'reviews'
  }
];

const authorPipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'hostId',
      foreignField: '_id',
      as: 'users',
    },
  },
  {
    $addFields: {
      author: { $arrayElemAt: ['$users', 0] },
    },
  },
  {
    $unset: ['users'],
  },
];

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

  public async findOfferById(offerId: string, currentHostId?: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(offerId) }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'comments',
        }
      },
      { $set: { isFavorite: { $in: [new Types.ObjectId(currentHostId), '$favorites'] } } },
      ...addReviewsToOffer,
      ...authorPipeline,
      {
        $unset: 'comments'
      }
    ])
      .exec();


    return result[0] ?? null;
  }

  public async find(currentHostId?: string, count?: number,): Promise<DocumentType<OfferEntity>[]> {
    const limit = count || DEFAULT_OFFER_COUNT;
    return this.offerModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'comments',
        }
      },
      { $set: { isFavorite: { $in: [new Types.ObjectId(currentHostId), '$favorites'] } } },
      ...addReviewsToOffer,
      ...authorPipeline,
      { $unset: ['comments'] },
      { $sort: { createdAt: SortType.Down } },
      { $limit: limit }
    ])
      .exec();
  }

  public async getPremiumByCity(cityName: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {
        $match: {
          'city.name': cityName,
          isPremium: true
        }
      },
      ...addReviewsToOffer,
      { $sort: { createdAt: SortType.Down } },
      { $limit: DEFAULT_OFFER_PREMIUM_COUNT },
    ]).exec();
  }

  public async getFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      { $match: { $expr: { $in: [new Types.ObjectId(userId), '$favorites'] } } },
      { $addFields: { id: { $toString: '$_id' } } },
      { $set: { isFavorite: { $in: [new Types.ObjectId(userId), '$favorites'] } } },
      { $sort: { createdAt: SortType.Down } },
    ])
      .exec();
  }

  public async toggleFavorite(userId: string, offerId: string, isFavorite: boolean): Promise<boolean> {
    const offer = await this.offerModel.findById(offerId).exec();

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found.`, 'DefaultOfferService');
    }

    const userObjectId = new Types.ObjectId(userId);

    if (!isFavorite) {
      offer?.favorites.pull(userObjectId);

      await offer?.save();
      return false;

    } else {
      offer?.favorites.push(userObjectId);

      await offer?.save();
      return true;
    }
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          reviewCount: 1,
        }
      }, { new: true }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async getRating(offerId: string): Promise<number> {
    const result = await this.offerModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(offerId) }
      },
      {
        $lookup: {
          from: 'comments',
          let: { offerId: '$_id' },
          pipeline: [
            { $match: { offerId: offerId } },
            { $project: { _id: null, rating: 1 } },
          ],
          as: 'comments',
        }
      },
      {
        $addFields: {
          numberOfComments: { $size: '$comments' },
          commentsSum: {
            $reduce: {
              input: '$comments',
              initialValue: 0,
              in: { $sum: ['$$value', '$$this.rating'] },
            },
          },
        },
      },
      {
        $addFields: {
          rating: { $round: [{ $divide: ['$commentsSum', '$numberOfComments'] }, 1] }
        },
      },
      {
        $unset: ['commentsLength', 'commentsSum', 'comments']
      }
    ])
      .exec();

    return result?.[0]?.rating ?? null;
  }

  public async updateRating(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    const rating = await this.getRating(offerId);

    if (!rating) {
      return null;
    }

    return this.offerModel
      .findByIdAndUpdate(offerId, { $set: { rating: rating } }, { new: true })
      .exec();
  }
}
