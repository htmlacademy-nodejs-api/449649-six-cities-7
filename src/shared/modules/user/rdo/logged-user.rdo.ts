import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public password: string;

  @Expose()
  public name: string;

  @Expose()
  public avatarPath: string;

  @Expose()
  public email: string;
}
