export class CreateCityDto {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
