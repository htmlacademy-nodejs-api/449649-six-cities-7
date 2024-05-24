export const EComponent = {
  CityModel: Symbol.for('CityModel'),
  CityService: Symbol.for('CityService'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  LocationModel: Symbol.for('LocationModel'),
  LocationService: Symbol.for('LocationService'),
  Logger: Symbol.for('Logger'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  OfferController: Symbol.for('OfferController'),
  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel'),
  RestApplication: Symbol.for('RestApplication'),
  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService')
} as const;
