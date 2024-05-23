import { inject, injectable } from 'inversify';
import express, { Express } from 'express';

import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { EComponent } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/database.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.Config) private readonly config: Config<RestSchema>,
    @inject(EComponent.DatabaseClient) private readonly databaseClient: DatabaseClient
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

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Try to init server…');
    await this._initServer();
    this.logger.info(
      `🚀 Server started on http://localhost:${this.config.get('PORT')}`
    );
  }
}
