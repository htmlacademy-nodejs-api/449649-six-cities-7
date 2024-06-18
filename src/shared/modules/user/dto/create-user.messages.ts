import { MAX_LENGTH_NAME, MAX_LENGTH_PASSWORD, MIN_LENGTH_NAME, MIN_LENGTH_PASSWORD } from '../user.constant.js';

export const CREATE_USER_MESSAGES = {
  NAME: {
    REQUIRED: 'Name is required.',
    MIN_LENGTH: `Name should be at least ${MIN_LENGTH_NAME} characters long.`,
    MAX_LENGTH: `Name should be at most ${MAX_LENGTH_NAME} characters long.`
  },
  EMAIL: {
    REQUIRED: 'Email is required.',
    INVALID_FORMAT: 'Invalid email format.'
  },
  AVATAR_PATH: {
    REQUIRED: 'Avatar path is required.',
    INVALID_FORMAT: 'Avatar must be a .jpg or .png image.'
  },
  TYPE: {
    REQUIRED: 'Type is required.',
    INVALID_FORMAT: 'Type should be either "Pro" or "Обычный"'
  },
  PASSWORD: {
    REQUIRED: 'Password is required.',
    MIN_LENGTH: `Password should be at least ${MIN_LENGTH_PASSWORD} characters long.`,
    MAX_LENGTH: `Password should be at most ${MAX_LENGTH_PASSWORD} characters long.`
  }
} as const;
