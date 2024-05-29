export const CreateUserMessages = {
  name: {
    required: 'Name is required.',
    minLength: 'Name should be at least 1 characters long.',
    maxLength: 'Name should be at most 15 characters long.'
  },
  email: {
    required: 'Email is required.',
    invalidFormat: 'Invalid email format.'
  },
  avatarPath: {
    required: 'Avatar path is required.',
    invalidFormat: 'Avatar must be a .jpg or .png image.'
  },
  type: {
    required: 'Type is required.',
    invalidFormat: 'Type should be either "Pro" or "Обычный"'
  },
  password: {
    required: 'Password is required.',
    minLength: 'Password should be at least 6 characters long.',
    maxLength: 'Password should be at most 12 characters long.'
  }
} as const;
