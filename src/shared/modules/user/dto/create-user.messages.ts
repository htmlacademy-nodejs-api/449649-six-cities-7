export const CREATE_USER_MESSAGES = {
  NAME: {
    REQUIRED: 'Name is required.',
    MIN_LENGTH: 'Name should be at least 1 characters long.',
    MAX_LENGTH: 'Name should be at most 15 characters long.'
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
    MIN_LENGTH: 'Password should be at least 6 characters long.',
    MAX_LENGTH: 'Password should be at most 12 characters long.'
  }
} as const;
