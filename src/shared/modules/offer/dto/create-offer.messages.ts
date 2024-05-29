export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalidFormat: 'City must be one of the following: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  images: {
    invalidFormat: 'Field images must be an array',
    minLength: 'Minimum images length must be 6',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  type: {
    invalidFormat: 'Type must be one of the following: apartment, room, house or hotel',
  },
  bedrooms: {
    invalidFormat: 'Bedrooms must be an integer',
    minValue: 'Minimum bedrooms is 1',
    maxValue: 'Maximum bedrooms is 8',
  },
  maxAdults: {
    invalidFormat: 'Max adults must be an integer',
    minValue: 'Minimum max adults is 1',
    maxValue: 'Maximum max adults is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  goods: {
    invalidFormat: 'Goods must be one of the following: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  userId: {
    invalidId: 'UserId field must be an array of valid id',
  },
} as const;
