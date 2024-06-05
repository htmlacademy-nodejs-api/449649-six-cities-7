import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController, HttpError, HttpMethod, ValidateDtoMiddleware } from '../../libs/rest/index.js';
import { EComponent } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './default-comment.service.js';
import { OfferService } from '../offer/index.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { CreateCommentDto } from './index.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected readonly logger: Logger,
    @inject(EComponent.CommentService) private readonly commentService: CommentService,
    @inject(EComponent.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]
    });
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({ ...body, userId: tokenPayload.id });
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
