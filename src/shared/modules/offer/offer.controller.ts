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
  RequestBody,
  HttpError
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
import { UserService } from '../user/user-service.interface.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected logger: Logger,
    @inject(EComponent.OfferService) private readonly offerService: OfferService,
    @inject(EComponent.UserService) private readonly userService: UserService,
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
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateObjectIdMiddleware('offerId')
      ]
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.GET,
      handler: this.showPremiumOffersByCity
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.DELETE,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateObjectIdMiddleware('offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.PATCH,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.POST,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.configService.get('STATIC_UPLOAD_PATH'), 'previewImage'),
        new ValidateObjectIdMiddleware('offerId'),
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
      path: '/favorites/:offerId',
      method: HttpMethod.PUT,
      handler: this.updateFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateObjectIdMiddleware('offerId')
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

  public async delete({ params, tokenPayload }: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findOfferById(params.offerId);
    const author = await this.userService.findById(String(offer?.userId));
    if (author?.email !== tokenPayload.email) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `${tokenPayload.email} didn't create this offer`,
      );
    }
    const existsOffer = await this.offerService.deleteById(params.offerId);
    const numberOfDeletedReviews = await this.commentService.deleteByOfferId(params.offerId);
    this.ok(res, {
      remoteOffer: existsOffer,
      numberOfDeletedReviews: numberOfDeletedReviews,
    });
  }

  public async update({ body, params, tokenPayload }: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findOfferById(params.offerId);
    const author = await this.userService.findById(String(offer?.userId));
    if (author?.email !== tokenPayload.email) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `${tokenPayload.email} didn't create this offer`,
      );
    }
    const updatedOffer = await this.offerService.updateById(String(params.offerId), body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async showPremiumOffersByCity({ query }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getPremiumByCity(query.cityName as string);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async showFavoritesOffers({ tokenPayload: { id } }: Request, res: Response): Promise<void> {
    console.log(id);
    const offers = await this.offerService.getFavorites(id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async uploadImage({ params: { offerId }, file }: Request<ParamOfferId>, res: Response) {
    const updateDto = { previewImage: file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImageRdo, updateDto));
  }

  public async updateFavorite(
    { params: { offerId }, tokenPayload, body: { isFavorite } }: Request<ParamOfferId, RequestBody, { isFavorite: boolean }>,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.toggleFavorite(tokenPayload.id, offerId, isFavorite);
    this.ok(res, {
      favorites: offer,
    });
  }
}
