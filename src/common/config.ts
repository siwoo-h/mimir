import * as dotenv from 'dotenv';

dotenv.config();

export enum NodeEnv {
  PROD = 'production',
  DEV = 'development',
}

export interface ServerConfig {
  nodeEnv: NodeEnv;
  host: string;
  port: number;
  originDomain: string;
  passwordSalt: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface SwaggerConfig {
  username: string;
  password: string;
}

export default () => ({
  server: {
    nodeEnv: process.env.NODE_ENV || NodeEnv.DEV,
    host: process.env.SERVER_HOST || 'localhost',
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
    originDomain: process.env.ORIGIN_DOMAIN || 'http://localhost:3000',
    passwordSalt: process.env.AUTH_SALT || 'mimir',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'mimir',
    password: process.env.DB_PASSWORD || 'mimirpw',
    database: process.env.DB_NAME || 'mimir',
  },
  swagger: {
    username: process.env.SWAGGER_USERNAME,
    password: process.env.SWAGGER_PASSWORD,
  },
});
