import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';

import { AuthService } from './auth-service.interface.js';
import { EComponent } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { LoginUserDto, UserEntity, UserService } from '../user/index.js';
import { TokenPayload } from './types/token-payload.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { UserPasswordIncorrectException } from './errors/index.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.UserService) private readonly userService: UserService,
    @inject(EComponent.Config) private readonly config: Config<RestSchema>,
  ) { }

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.email,
      id: user.id,
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: this.config.get('JWT_ALGORITHM') })
      .setIssuedAt()
      .setExpirationTime(this.config.get('JWT_EXPIRED'))
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user || !user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
