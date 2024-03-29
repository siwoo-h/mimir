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
}

export interface AuthConfig {
  passwordSalt: string;
  jwtSecret: string;
  jwtExpiresIn: string;
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
  },
  auth: {
    passwordSalt: process.env.AUTH_SALT,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || 1000 * 60 * 60 * 1,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: 'root',
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  swagger: {
    username: process.env.SWAGGER_USERNAME,
    password: process.env.SWAGGER_PASSWORD,
  },
});
