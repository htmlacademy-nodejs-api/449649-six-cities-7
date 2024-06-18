import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { ECityName, EGoodType, EOfferType, EUserType } from '../../types/enums.js';
import { IOffer } from '../../types/offer.interface.js';
import { IUser } from '../../types/user.interface.js';
import { TLocation } from '../../types/location.type.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): IOffer {
    const [
      title,
      description,
      postdate,
      city,
      previewImage,
      images,
      isPremium,
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
      latitudeStr,
      longitudeStr
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postdate),
      city: city as ECityName,
      previewImage,
      images: this.parseListString(images),
      isPremium: !!isPremium,
      isFavorite: false,
      rating: parseFloat(rating),
      type: type as EOfferType,
      bedrooms: parseInt(bedrooms, 10),
      maxAdults: parseInt(maxAdults, 10),
      price: parseInt(price, 10),
      goods: this.parseListString(goods) as EGoodType[],
      user: this.parseUser(name, email, avatarPath, userType as EUserType),
      numberOfComments: parseInt(numberOfComments, 10),
      location: this.parseLocation(latitudeStr, longitudeStr)
    };
  }

  private parseLocation(latitudeStr: string, longitudeStr: string): TLocation {
    return { latitude: Number(latitudeStr), longitude: Number(longitudeStr) };
  }

  private parseListString(categoriesString: string): string[] {
    return categoriesString.split(';').map((item) => item);
  }

  private parseUser(name: string, email: string, avatarPath: string, userType: EUserType): IUser {
    return { name, email, avatarPath, type: userType };
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
