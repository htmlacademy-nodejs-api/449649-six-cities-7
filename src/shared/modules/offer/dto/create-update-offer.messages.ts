import { MAX_BEDROOMS, MAX_RATING, MAX_TITLE_LENGTH, MIN_BEDROOMS, MIN_IMAGES_LENGTH, MIN_RATING, MIN_TITLE_LENGTH } from '../offer.constant.js';

export const CREATE_UPDATE_OFFER_VALIDATION_MESSAGE = {
  TITLE: {
    MIN_LENGTH: `Minimum title length must be ${MIN_TITLE_LENGTH}`,
    MAX_LENGTH: `Maximum title length must be ${MAX_TITLE_LENGTH}`,
  },
  DESCRIPTION: {
    MIN_LENGTH: `Minimum description length must be ${MIN_TITLE_LENGTH}`,
    MAX_LENGTH: `Maximum description length must be ${MAX_TITLE_LENGTH}`,
  },
  POST_DATE: {
    INVALID_FORMAT: 'postDate must be a valid ISO date',
  },
  CITY: {
    INVALID_FORMAT: 'City must be one of the following: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  IMAGES: {
    INVALID_FORMAT: 'Field images must be an array',
    MIN_LENGTH: `Minimum images length must be ${MIN_IMAGES_LENGTH}`,
  },
  IS_PREMIUM: {
    INVALID_FORMAT: 'isPremium must be a boolean',
  },
  RATING: {
    INVALID_FORMAT: 'Rating must be an integer',
    MIN_VALUE: `Minimum rating is ${MIN_RATING}`,
    MAX_VALUE: `Maximum rating is ${MAX_RATING}`,
  },
  TYPE: {
    INVALID_FORMAT: 'Type must be one of the following: apartment, room, house or hotel',
  },
  BEDROOMS: {
    INVALID_FORMAT: 'Bedrooms must be an integer',
    MIN_VALUE: `Minimum bedrooms is ${MIN_BEDROOMS}`,
    MAX_VALUE: `Maximum bedrooms is ${MAX_BEDROOMS}`,
  },
  MAX_ADULTS: {
    INVALID_FORMAT: 'Max adults must be an integer',
    MIN_VALUE: `Minimum max adults is ${MIN_BEDROOMS}`,
    MAX_VALUE: `Maximum max adults is ${MAX_BEDROOMS}`,
  },
  PRICE: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: `Minimum price is ${MIN_BEDROOMS}`,
    MAX_VALUE: `Maximum price is ${MAX_BEDROOMS}`,
  },
  GOODS: {
    INVALID_FORMAT: 'Goods must be one of the following: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  USER_ID: {
    INVALID_ID: 'UserId field must be an array of valid id',
  }
} as const;
