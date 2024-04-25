import { CitiesNames } from './citiesNames.type.js';
import { Location } from './location.type.js';

const cities: Record<string, Location> = {
  [CitiesNames.Paris]: { latitude: 48.85661, longitude: 2.351499 },
  [CitiesNames.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
  [CitiesNames.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
  [CitiesNames.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
  [CitiesNames.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
  [CitiesNames.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 }
} as const;

console.log(cities);
