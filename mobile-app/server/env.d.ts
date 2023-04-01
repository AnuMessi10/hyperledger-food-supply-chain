import { Secret } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      MONGODB_URI: string;
      JWT_PRIVATE_SECRET: Secret;
      JWT_PUBLIC_SECRET: Secret;
      ORIGIN?: string;
      TWILIO_ACCOUNT_SID: string;
      TWILIO_AUTH_TOKEN: string;
      TWILIO_MOBILE_NUMBER: string;
    }
  }
}

export {};
