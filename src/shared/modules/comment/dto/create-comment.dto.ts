import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: CreateCommentMessages.text.lengthField })
  public text: string;

  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(1, { message: CreateCommentMessages.rating.minField })
  @Max(5, { message: CreateCommentMessages.rating.maxField })
  public rating: number;

  public userId: string;
}
