import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { EComponent } from '../../types/index.js';
import { OfferService } from './offer.service.interface.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected readonly logger: Logger,
    @inject(EComponent.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.POST, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
}
