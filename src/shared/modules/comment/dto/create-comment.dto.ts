import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

import { COMMENT_MESSAGES } from './create-comment.messages.js';
import { MAX_RATING, MAX_TEXT_LENGTH, MIN_RATING, MIN_TEXT_LENGTH } from '../comment.constant.js';

export class CreateCommentDto {
  @IsMongoId({ message: COMMENT_MESSAGES.OFFER_ID.INVALID_FORMAT })
  public offerId: string;

  @IsString({ message: COMMENT_MESSAGES.TEXT.INVALID_FORMAT })
  @Length(MIN_TEXT_LENGTH, MAX_TEXT_LENGTH, { message: COMMENT_MESSAGES.TEXT.LENGTH_FIELD })
  public text: string;

  @IsInt({ message: COMMENT_MESSAGES.RATING.INVALID_FORMAT })
  @Min(MIN_RATING, { message: COMMENT_MESSAGES.RATING.MIN_LENGTH })
  @Max(MAX_RATING, { message: COMMENT_MESSAGES.RATING.MAX_LENGTH })
  public rating: number;

  public userId: string;
}
