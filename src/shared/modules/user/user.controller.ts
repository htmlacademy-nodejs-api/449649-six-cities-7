import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController, HttpError, HttpMethod, UploadFileMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { EComponent } from '../../types/index.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { fillDTO } from '../../helpers/common.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected readonly logger: Logger,
    @inject(EComponent.UserService) private readonly userService: UserService,
    @inject(EComponent.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.POST,
      handler: this.uploadAvatar,
      middlewares: [
        new UploadFileMiddleware(this.configService.get('STATIC_UPLOAD_PATH'), 'avatar'),
        new ValidateObjectIdMiddleware('userId')
      ]
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response
  ): Promise<void> {
    try {
      const result = await this.userService.create(body, this.configService.get('SALT'));
      this.created(res, fillDTO(UserRdo, result));
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.httpStatusCode).json({ message: error.message });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
      }
    }
  }


  public async uploadAvatar({ params, file }: Request, res: Response) {
    const { userId } = params;
    const uploadFile = { avatarPath: file?.filename };
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, { filepath: uploadFile.avatarPath }));
  }
}
