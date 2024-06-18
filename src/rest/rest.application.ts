import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import cors from 'cors';

import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { EComponent } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getFullServerPath, getMongoURI } from '../shared/helpers/index.js';
import { Controller, ExceptionFilter, ParseTokenMiddleware } from '../shared/libs/rest/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.Config) private readonly config: Config<RestSchema>,
    @inject(EComponent.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(EComponent.OfferController) private readonly offerController: Controller,
    @inject(EComponent.UserController) private readonly userController: Controller,
    @inject(EComponent.CommentController) private readonly commentController: Controller,
    @inject(EComponent.AuthController) private readonly authController: Controller,
    @inject(EComponent.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(EComponent.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
    @inject(EComponent.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(EComponent.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,
  ) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/comments', this.commentController.router);
    this.server.use('/auth', this.authController.router);
  }

  private async initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(
      this.config.get('STATIC_UPLOAD_PATH'),
      express.static(this.config.get('STATIC_UPLOAD_PATH'))
    );
    this.server.use(
      this.config.get('STATIC_DIRECTORY_PATH'),
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server…');
    await this.initServer();
    this.logger.info(
      `🚀 Server started on
      ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`
    );
  }
}
