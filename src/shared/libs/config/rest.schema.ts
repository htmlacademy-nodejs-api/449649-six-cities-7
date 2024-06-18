import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  JWT_ALGORITHM: string;
  JWT_EXPIRED: string;
  JWT_SECRET: string;
  LOG_FILE_PATH: string;
  HOST: string;
  STATIC_DIRECTORY_PATH: string;
  STATIC_UPLOAD_PATH: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: null
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: null
  },
  DB_USER: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: null,
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: null
  },
  JWT_ALGORITHM: {
    doc: 'Algorithm for JWT',
    format: String,
    env: 'JWT_ALGORITHM',
    default: null
  },
  JWT_EXPIRED: {
    doc: 'Expired time for JWT',
    format: String,
    env: 'JWT_EXPIRED',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret for sign JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
  LOG_FILE_PATH: {
    doc: 'Path to log file',
    format: String,
    env: 'LOG_FILE_PATH',
    default: null
  },
  HOST: {
    doc: 'Host where started service',
    format: String,
    env: 'HOST',
    default: null
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Path to directory with static resources',
    format: String,
    env: 'STATIC_DIRECTORY_PATH',
    default: null
  },
  STATIC_UPLOAD_PATH: {
    doc: 'Directory for upload files',
    format: String,
    env: 'STATIC_UPLOAD_PATH',
    default: null
  },
});
