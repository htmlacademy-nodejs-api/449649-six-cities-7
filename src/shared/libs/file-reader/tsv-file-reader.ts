import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { IOffer } from '../../types/offer.type.js';
import { TCity } from '../../types/city.type.js';
import { ECityName, EGoodType, EOfferType, EUserType } from '../../types/enums.js';
import { TLocation } from '../../types/location.type.js';
import { IUser } from '../../types/user.type.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  private parseLineToOffer(line: string): IOffer {
    const [
      title,
      description,
      postDate,
      cityName,
      cityLatitude,
      cityLongitude,
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
      userType,
      numberOfComments,
      latitude,
      longitude
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: this.parseCity(cityName, cityLatitude, cityLongitude),
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
      user: this.parseUser(name, email, avatarPath, userType),
      numberOfComments: parseInt(numberOfComments, 10),
      location: this.parseLocation(latitude, longitude)
    };
  }

  private parseGoods(goodsString: string): EGoodType[] {
    return goodsString.split(';').filter((good) => good in EGoodType) as EGoodType[];
  }

  private parseCity(cityName: string, cityLatitude: string, cityLongitude: string): TCity {
    if (Object.values(ECityName).includes(cityName as ECityName)) {
      return { name: cityName, location: {latitude: Number(cityLatitude), longitude: Number(cityLongitude)} };
    } else {
      console.error(`Unknown city name: ${cityName}`);
      return { name: cityName, location: { latitude: 0, longitude: 0 } };
    }
  }

  private parseOfferType(typeString: string): EOfferType {
    const normalizedType = typeString.toLowerCase();

    if (Object.values(EOfferType).includes(normalizedType as EOfferType)) {
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
    const latitude = Number(latitudeStr);
    const longitude = Number(longitudeStr);

    return { latitude, longitude };
  }

  private parseUser(name: string, email: string, avatarPath: string, userType: string): IUser {
    let type = EUserType[userType.toUpperCase() as keyof typeof EUserType] as EUserType;

    if (type === undefined) {
      console.error(`Unknown user type: ${userType}`);
      type = EUserType.BASIC;
    }

    return {
      name: name,
      email: email,
      avatarPath: avatarPath,
      type: type
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
