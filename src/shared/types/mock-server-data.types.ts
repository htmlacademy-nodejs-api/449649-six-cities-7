import { TCity } from './city.type.js';
import { EGoodType, EOfferType , EUserType} from './enums.js';
import { TLocation } from './location.type.js';

export interface MockServerData {
  titles: string[];
  descriptions: string[];
  cities: TCity[];
  previewImages: string[];
  images: string[];
  isPremium: boolean[];
  isFavorite: boolean[];
  types: EOfferType[];
  goods: EGoodType[];
  hostNames: string[];
  hostEmails: string[];
  hostAvatarUrls: string[];
  hostPasswords: string[];
  hostTypes: EUserType[];
  locations: TLocation[];
}
