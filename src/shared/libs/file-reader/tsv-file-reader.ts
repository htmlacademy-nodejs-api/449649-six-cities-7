import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.type.js';
import { OfferType } from '../../types/offer-type.type.js';
import { GoodType } from '../../types/good-type.type.js';
import { CitiesNames } from '../../types/citiesNames.type.js';
import { Location } from '../../types/location.type.js';
import { CITIES } from '../../types/cities.type.js';
import { User } from '../../types/user.type.js';

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

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
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
      isPro,
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
      user: this.parseUser(name, email, avatarPath, password, !!isPro),
      numberOfComments: parseInt(numberOfComments, 10),
      location: this.parseLocation(latitude, longitude)
    };
  }

  private parseGoods(goodsString: string): GoodType[] {
    const goodsArray = goodsString.split(';');
    const parsedGoods: GoodType[] = [];

    goodsArray.forEach((good) => {
      if (Object.values(GoodType).includes(good as GoodType)) {
        parsedGoods.push(good as GoodType);
      } else {
        console.error(`Unknown GoodType: ${good}`);
      }
    });

    return parsedGoods;
  }

  private parseCity(cityName: string): City {
    if (Object.values(CitiesNames).includes(cityName as CitiesNames)) {
      const location: Location = CITIES[cityName as CitiesNames];
      return { name: cityName, location };
    } else {
      console.error(`Unknown city name: ${cityName}`);
      return { name: cityName, location: { latitude: 0, longitude: 0 } };
    }
  }

  private parseOfferType(typeString: string): OfferType {
    const normalizedType = typeString.toLowerCase();

    if (normalizedType in OfferType) {
      return normalizedType as OfferType;
    } else {
      console.error(`Unknown offer type: ${typeString}`);
      return OfferType.Appartment;
    }
  }

  private parseImages(imagesString: string): string[] {
    return imagesString.split(';').map((imageUrl) => imageUrl.trim());
  }


  private parsePrice(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseLocation(latitudeStr: string, longitudeStr: string): Location {
    const latitude = parseFloat(latitudeStr);
    const longitude = parseFloat(longitudeStr);

    return { latitude, longitude };
  }

  private parseUser(name: string, email: string, avatarPath: string, password: string, isPro: boolean): User {
    return {
      name: name,
      email: email,
      avatarPath: avatarPath,
      password: password,
      isPro: isPro
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
