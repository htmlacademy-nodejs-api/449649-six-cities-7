import { CITIES } from '../../cities.js';
import { EGoodType, EOfferType } from '../../types/enums.js';

export function validateCity(cityName: string): boolean {
  return Object.keys(CITIES).includes(cityName);
}

export function validateOfferType(type: string): boolean {
  return Object.values(EOfferType).includes(type as EOfferType);
}

export function validateGoodType(goodType: string): boolean {
  return Object.values(EGoodType).includes(goodType as EGoodType);
}
