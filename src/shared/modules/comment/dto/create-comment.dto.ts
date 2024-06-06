import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

import { COMMENT_MESSAGES } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsMongoId({ message: COMMENT_MESSAGES.OFFER_ID.INVALID_FORMAT })
  public offerId: string;

  @IsString({ message: COMMENT_MESSAGES.TEXT.INVALID_FORMAT })
  @Length(5, 1024, { message: COMMENT_MESSAGES.TEXT.LENGTH_FIELD })
  public text: string;

  @IsInt({ message: COMMENT_MESSAGES.RATING.INVALID_FORMAT })
  @Min(1, { message: COMMENT_MESSAGES.RATING.MIN_LENGTH })
  @Max(5, { message: COMMENT_MESSAGES.RATING.MAX_LENGTH })
  public rating: number;

  public userId: string;
}
