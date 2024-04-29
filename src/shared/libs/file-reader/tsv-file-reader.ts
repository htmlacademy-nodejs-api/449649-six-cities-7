import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { IOffer } from '../../types/offer.type.js';
import { TCity } from '../../types/city.type.js';
import { ECityName, EGoodType, EOfferType, EUserType } from '../../types/enums.js';
import { TLocation } from '../../types/location.type.js';
import { CITIES } from '../../types/cities.type.js';
import { IUser } from '../../types/user.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): IOffer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): IOffer {
    const [
      id,
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      name,
      email,
      avatarPath,
      password,
      userType,
      numberOfComments,
      latitude,
      longitude
    ] = line.split('\t');

    return {
      id,
      title,
      description,
      postDate: new Date(postDate),
      city: this.parseCity(city),
      previewImage: previewImage,
      images: this.parseImages(images),
      isPremium: !!isPremium,
      isFavorite: !!isFavorite,
      rating: parseInt(rating, 10),
      type: this.parseOfferType(type),
      bedrooms: parseInt(bedrooms, 10),
      maxAdults: parseInt(maxAdults, 10),
      price: this.parsePrice(price),
      goods: this.parseGoods(goods),
      user: this.parseUser(name, email, avatarPath, password, userType),
      numberOfComments: parseInt(numberOfComments, 10),
      location: this.parseLocation(latitude, longitude)
    };
  }

  private parseGoods(goodsString: string): EGoodType[] {
    return goodsString.split(';').filter((good) => good in EGoodType) as EGoodType[];
  }

  private parseCity(cityName: string): TCity {
    if (Object.values(ECityName).includes(cityName as ECityName)) {
      const location: TLocation = CITIES[cityName as ECityName];
      return { name: cityName, location };
    } else {
      console.error(`Unknown city name: ${cityName}`);
      return { name: cityName, location: { latitude: 0, longitude: 0 } };
    }
  }

  private parseOfferType(typeString: string): EOfferType {
    const normalizedType = typeString.toLowerCase();

    if (normalizedType in EOfferType) {
      return normalizedType as EOfferType;
    } else {
      console.error(`Unknown offer type: ${typeString}`);
      return EOfferType.APARTMENT;
    }
  }

  private parseImages(imagesString: string): string[] {
    return imagesString.split(';').map((imageUrl) => imageUrl.trim());
  }


  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseLocation(latitudeStr: string, longitudeStr: string): TLocation {
    const latitude = parseFloat(latitudeStr);
    const longitude = parseFloat(longitudeStr);

    return { latitude, longitude };
  }

  private parseUser(name: string, email: string, avatarPath: string, password: string, userType: string): IUser {
    let type = userType.toLowerCase();
    if (type in EUserType) {
      type = type as EUserType;
    } else {
      console.error(`Unknown user type: ${userType}`);
      type = EUserType.BASIC;
    }
    return {
      name: name,
      email: email,
      avatarPath: avatarPath,
      password: password,
      type: type as EUserType
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): IOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
