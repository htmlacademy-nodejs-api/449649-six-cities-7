import dayjs from 'dayjs';
import { GENERATOR_CONFIG } from './generator-config.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { TMockServerData } from '../../types/mock-server-data.types.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: TMockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(GENERATOR_CONFIG.FIRST_WEEK_DAY, GENERATOR_CONFIG.LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.previewImages).join(',');
    const isPremium = getRandomItem(this.mockData.isPremium);
    const isFavorite = getRandomItem(this.mockData.isFavorite);
    const rating = generateRandomValue(GENERATOR_CONFIG.MIN_RATING, GENERATOR_CONFIG.MAX_RATING);
    const type = getRandomItem(this.mockData.types);
    const room = generateRandomValue(GENERATOR_CONFIG.MIN_ROOM, GENERATOR_CONFIG.MAX_ROOM);
    const bedroom = generateRandomValue(GENERATOR_CONFIG.MIN_BEDROOM, GENERATOR_CONFIG.MAX_BEDROOM);
    const price = generateRandomValue(GENERATOR_CONFIG.MIN_PRICE, GENERATOR_CONFIG.MAX_PRICE);
    const goods = getRandomItems(this.mockData.goods).join(',');
    const hostName = getRandomItem(this.mockData.hostNames);
    const hostEmail = getRandomItem(this.mockData.hostEmails);
    const hostAvatar = getRandomItem(this.mockData.hostAvatarUrls);
    const hostPassword = getRandomItem(this.mockData.hostPasswords);
    const hostType = getRandomItem(this.mockData.hostTypes);
    const location = getRandomItem(this.mockData.locations);

    return [
      title, description, postDate, city.name, city.location.latitude, city.location.longitude,
      previewImage, images, isPremium, isFavorite, rating, type, room, bedroom, price, goods,
      hostName, hostEmail, hostAvatar, hostPassword, hostType, location.latitude, location.longitude
    ].join('\t');
  }
}
