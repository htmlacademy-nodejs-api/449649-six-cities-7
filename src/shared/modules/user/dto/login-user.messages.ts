import { MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from '../user.constant.js';

export const CREATE_LOGIN_USER_MESSAGE = {
  EMAIL: {
    INVALID_FORMAT: 'Email must be a valid address',
  },
  PASSWORD: {
    INVALID_FORMAT: 'Password is required',
    LENGTH_FIELD: `Password must be between ${MIN_LENGTH_PASSWORD} and ${MAX_LENGTH_PASSWORD} characters`,
  }
} as const;
