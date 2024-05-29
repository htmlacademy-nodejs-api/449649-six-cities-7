export const CreateCommentMessages = {
  offerId: {
    invalidFormat: 'OfferId field must be a valid id'
  },
  text: {
    invalidFormat: 'Text is required',
    lengthField: 'Min length is 5, max is 2024'
  },
  rating: {
    invalidFormat: 'Rating is should be a number',
    minField: 'Min value is 1',
    maxField: 'Max value is 5'
  },
  userId: {
    invalidFormat: 'UserId field must be a valid id'
  },
} as const;
