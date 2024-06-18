import { Logger as PinoInstance, pino, transport } from 'pino';
import { inject, injectable } from 'inversify';
import { resolve } from 'node:path';

import { Logger } from './logger.interface.js';
import { EComponent } from '../../types/component.enum.js';
import { RestSchema } from '../config/rest.schema.js';
import { Config } from 'convict';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor(
    @inject(EComponent.Config) private readonly configService: Config<RestSchema>
  ) {
    const logFilePath = this.configService.get('LOG_FILE_PATH');
    const destination = resolve(logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        }
      ],
    });

    this.logger = pino({}, multiTransport);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
