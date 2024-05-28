import { inject, injectable } from 'inversify';
import { NextFunction, Response } from 'express';

import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { EComponent } from '../../types/index.js';
import { CreateUserRequest } from './create-user-request.type.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected readonly logger: Logger,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.POST, handler: this.create });
  }

  public async create(
    _req: CreateUserRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      throw new Error('[UserController] Oops');
    } catch (error) {
      return next(error);
    }
  }
}
