import { HandleUploadFileInterface, ProcessedImageInterface } from '@/application/services/HandleUploadFileInterface';
import sharp from 'sharp';

const MAX_WIDTH = 2000;
const WEBP_QUALITY = 60;
export class HandleUploadFile implements HandleUploadFileInterface {
  async process({ buffer }: { buffer: Buffer }): Promise<ProcessedImageInterface> {
    const { data, info } = await sharp(buffer)
      .resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .toFormat('webp', { quality: WEBP_QUALITY })
      .toBuffer({ resolveWithObject: true });

    return {
      data,
      format: 'webp',
      height: info.height,
      width: info.width,
      sizeInBytes: info.size,
    };
  }
}
