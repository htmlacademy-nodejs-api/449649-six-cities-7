import { ECityName } from './enums.js';
import { TLocation } from './location.type.js';

export const CITIES: Record<string, TLocation> = {
  [ECityName.PARIS]: { latitude: 48.85661, longitude: 2.351499 },
  [ECityName.COLOGNE]: { latitude: 50.938361, longitude: 6.959974 },
  [ECityName.BRUSSELS]: { latitude: 50.846557, longitude: 4.351697 },
  [ECityName.AMSTERDAM]: { latitude: 52.370216, longitude: 4.895168 },
  [ECityName.HAMBURG]: { latitude: 53.550341, longitude: 10.000654 },
  [ECityName.DUSSELDORF]: { latitude: 51.225402, longitude: 6.776314 }
};
