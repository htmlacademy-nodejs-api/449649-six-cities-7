export const CREATE_LOGIN_USER_MESSAGE = {
  EMAIL: {
    INVALID_FORMAT: 'Email must be a valid address',
  },
  PASSWORD: {
    INVALID_FORMAT: 'Password is required',
    LENGTH_FIELD: 'Password must be between 6 and 12 characters',
  }
} as const;
