import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware,
  UploadFileMiddleware,
  RequestBody
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { EComponent } from '../../types/index.js';
import { OfferService } from './offer.service.interface.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferDto } from './index.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentService } from '../comment/index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { UploadImageRdo } from './rdo/upload-image.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected logger: Logger,
    @inject(EComponent.OfferService) private readonly offerService: OfferService,
    @inject(EComponent.CommentService) private readonly commentService: CommentService,
    @inject(EComponent.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.GET,
      handler: this.show,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.GET, handler: this.showPremiumOffersByCity });
    this.addRoute({ path: '/', method: HttpMethod.POST, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateOfferDto)] });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.DELETE,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.PATCH,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.POST,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'previewImage'),
      ]
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.GET,
      handler: this.showFavoritesOffers,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/:offerId/favorites',
      method: HttpMethod.PUT,
      handler: this.updateFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async show({ params: { offerId } }: Request<ParamOfferId>, res: Response): Promise<void> {
    const offer = await this.offerService.findOfferById(offerId);
    this.ok(res, offer);
  }

  public async create(
    { body, tokenPayload }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: tokenPayload.id });
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async delete({ params: { offerId } }: Request<ParamOfferId>, res: Response): Promise<void> {
    const offer = await this.offerService.deletebyId(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async showPremiumOffersByCity({ query }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getPremiumByCity(query.cityName as string);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async showFavoritesOffers({ tokenPayload: { id } }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getFavorites(id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async uploadImage({ params: { offerId }, file }: Request<ParamOfferId>, res: Response) {
    const updateDto = { previewImage: file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImageRdo, updateDto));
  }

  public async updateFavorite(
    { params: { offerId }, body }: Request<ParamOfferId, RequestBody, { isFavorite: string }>,
    res: Response,
  ): Promise<void> {
    const isFavorite = body.isFavorite === 'true';

    const result = isFavorite
      ? await this.offerService.addToFavorite(offerId)
      : await this.offerService.deleteFromFavorite(offerId);

    this.ok(res, {
      isFavorite: result,
    });
  }
}
