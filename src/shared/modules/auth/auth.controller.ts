import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { EComponent } from '../../types/index.js';
import { LoginUserRequest } from '../user/login-user-request.type.js';
import { AuthService } from './auth-service.interface.js';
import { LoggedUserRdo } from '../user/rdo/logged-user.rdo.js';
import { fillDTO } from '../../helpers/common.js';
import { UserService } from '../user/user-service.interface.js';

@injectable()
export class AuthController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected readonly logger: Logger,
    @inject(EComponent.AuthService) private readonly authService: AuthService,
    @inject(EComponent.UserService) private readonly userService: UserService
  ) {
    super(logger);
    this.logger.info('Register routes for AuthController…');

    this.addRoute({
      path: '/login',
      method: HttpMethod.POST,
      handler: this.login,
    });

    this.addRoute({
      path: '/check-auth',
      method: HttpMethod.GET,
      handler: this.checkAuth,
    });

    this.addRoute({
      path: '/logout',
      method: HttpMethod.POST,
      handler: this.logout,
    });
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async checkAuth({ tokenPayload: { email } }: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'AuthController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async logout(_req: Request, res: Response): Promise<void> {
    this.ok(res, { message: 'Logged out successfully' });
  }
}
