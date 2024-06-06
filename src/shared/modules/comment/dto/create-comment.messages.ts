import { MAX_RATING, MAX_TEXT_LENGTH, MIN_RATING, MIN_TEXT_LENGTH } from '../comment.constant.js';

export const COMMENT_MESSAGES = {
  OFFER_ID: {
    INVALID_FORMAT: 'OfferId field must be a valid id'
  },
  TEXT: {
    INVALID_FORMAT: 'Text is required',
    LENGTH_FIELD: `Min length is ${MIN_TEXT_LENGTH} and max length is ${MAX_TEXT_LENGTH}`
  },
  RATING: {
    INVALID_FORMAT: 'Rating is should be a number',
    MIN_LENGTH: `Min value is ${MIN_RATING}`,
    MAX_LENGTH: `Max value is ${MAX_RATING}`
  },
  USERID: {
    INVALID_FORMAT: 'UserId field must be a valid id'
  },
} as const;
