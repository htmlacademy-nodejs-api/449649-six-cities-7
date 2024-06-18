import dayjs from 'dayjs';
import { GENERATOR_CONFIG } from './generator-config.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { TMockServerData } from '../../types/mock-server-data.types.js';
import { ECityName, EGoodType, EOfferType } from '../../types/enums.js';
import { CITIES } from '../../cities.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: TMockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(GENERATOR_CONFIG.FIRST_WEEK_DAY, GENERATOR_CONFIG.LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<ECityName>(this.mockData.cities as ECityName[]);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = getRandomItems(this.mockData.previewImages).join(',');
    const isPremium = getRandomItem(this.mockData.isPremium);
    const rating = generateRandomValue(GENERATOR_CONFIG.MIN_RATING, GENERATOR_CONFIG.MAX_RATING);
    const type = getRandomItem<EOfferType>(this.mockData.types as EOfferType[]);
    const room = generateRandomValue(GENERATOR_CONFIG.MIN_ROOM, GENERATOR_CONFIG.MAX_ROOM);
    const bedroom = generateRandomValue(GENERATOR_CONFIG.MIN_BEDROOM, GENERATOR_CONFIG.MAX_BEDROOM);
    const price = generateRandomValue(GENERATOR_CONFIG.MIN_PRICE, GENERATOR_CONFIG.MAX_PRICE);
    const goods = getRandomItems<EGoodType>(this.mockData.goods as EGoodType[]).join(',');
    const hostName = getRandomItem(this.mockData.hostNames);
    const hostEmail = getRandomItem(this.mockData.hostEmails);
    const hostAvatar = getRandomItem(this.mockData.hostAvatarUrls);
    const hostType = getRandomItem(this.mockData.hostTypes);
    const numberOfComments = generateRandomValue(GENERATOR_CONFIG.MIN_COMMENTS, GENERATOR_CONFIG.MAX_COMMENTS);
    const location = CITIES[city];

    return [
      title, description, postDate, city, previewImage, images, isPremium, rating, type, room, bedroom, price,
      goods, hostName, hostEmail, hostAvatar, hostType, numberOfComments, location.latitude, location.longitude
    ].join('\t');
  }
}
