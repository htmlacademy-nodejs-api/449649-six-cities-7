import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { EComponent } from '../../types/component.enum.js';
import { ICommentService } from './comment-service.interface.js';
import { DefaultCommentService } from './default-comment.service.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<ICommentService>(EComponent.CommentService)
    .to(DefaultCommentService).inSingletonScope();

  commentContainer
    .bind<types.ModelType<CommentEntity>>(EComponent.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
