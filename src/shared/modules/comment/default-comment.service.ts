import { types, DocumentType } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { EComponent } from '../../types/component.enum.js';
import { ICommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { OfferService } from '../offer/offer.service.interface.js';
import { DEFAULT_COMMENT_COUNT } from './comment.constant.js';
import { SortType } from '../../types/sort-type.enum.js';


@injectable()
export class CommentService implements ICommentService {
  constructor(
    @inject(EComponent.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(EComponent.OfferService)
    private readonly offerService: OfferService
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity> | null> {
    const offer = await this.offerService.incCommentCount(dto.offerId);
    if (!offer) {
      return null;
    }

    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? DEFAULT_COMMENT_COUNT;
    return this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }
}
