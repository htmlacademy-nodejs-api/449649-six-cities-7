import { inject, injectable } from 'inversify';

import { DEFAULT_STATIC_IMAGES, STATIC_RESOURCE_FIELDS } from './path-transformer.constant.js';
import { EComponent } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { getFullServerPath } from '../../../helpers/index.js';
import { Config, RestSchema } from '../../config/index.js';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

@injectable()
export class PathTransformer {
  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.Config) private readonly config: Config<RestSchema>,
  ) {
    this.logger.info('PathTransformer created!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key) && typeof value === 'string') {
            const staticPath = this.config.get('STATIC_DIRECTORY_PATH');
            const uploadPath = this.config.get('STATIC_UPLOAD_PATH');
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');

            const rootPath = this.hasDefaultImage(value) ? staticPath : uploadPath;
            current[key] = `${getFullServerPath(serverHost, serverPort)}${rootPath}/${value}`;
          }
        }
      }
    }

    return data;
  }
}
