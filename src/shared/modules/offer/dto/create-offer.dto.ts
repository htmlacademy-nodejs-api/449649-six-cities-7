export class CreateOfferDto {
  public id: string;
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: string;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: string[];
  public numberOfComments: number;
  public user: string;
}
