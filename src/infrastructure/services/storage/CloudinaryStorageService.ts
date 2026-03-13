/* eslint-disable @typescript-eslint/naming-convention */
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import { StorageServiceInterface } from '@/application/services/StorageServiceInterface';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '@/infrastructure/api/config/envs';

export class CloudinaryStorageService implements StorageServiceInterface {
  private readonly cloudinary = cloudinary.v2;

  constructor() {
    this.cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  }

  async upload(folder: string, buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream({ folder }, (error, result) => {
        if (error || !result) {
          return reject(error);
        }
        resolve(result.secure_url);
      });

      streamifier.createReadStream(buffer).pipe(stream); // Buffer to ReadStream
    });
  }
}
