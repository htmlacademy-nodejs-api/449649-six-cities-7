import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { EComponent } from '../../types/component.enum.js';
import { ICommentService } from './comment-service.interface.js';
import { CommentService } from './default-comment.service.js';
import CommentController from './comment.controller.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<ICommentService>(EComponent.CommentService)
    .to(CommentService).inSingletonScope();

  commentContainer
    .bind<types.ModelType<CommentEntity>>(EComponent.CommentModel)
    .toConstantValue(CommentModel);

  commentContainer
    .bind(EComponent.CommentController)
    .to(CommentController)
    .inSingletonScope();

  return commentContainer;
}
