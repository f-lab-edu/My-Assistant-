import * as dotenv from 'dotenv';
import cloudinary from 'cloudinary';
dotenv.config({});

class Config {
  public CLIENT_URL: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;
  public RESEND_API_KEY: string | undefined;
  public JWT_SECRET: string | undefined;
  public JWT_REFRESH_SECRET: string | undefined;

  constructor() {
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.CLOUD_NAME = process.env.CLOUD_NAME || '';
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
    this.RESEND_API_KEY = process.env.RESEND_API_KEY || '';
    this.JWT_SECRET = process.env.JWT_SECRET || '';
    this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';
  }

  public cloudinaryConfig() {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET,
    });
  }
}

export const config: Config = new Config();
