import { inject, injectable } from 'inversify';

import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { EComponent } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
