import fsNode from 'fs';
import path from 'path';
import { StorageServiceInterface } from '@/application/services/StorageServiceInterface';

export class LocalStorageService implements StorageServiceInterface {
  async upload(folder: string, buffer: Buffer): Promise<string> {
    const folderPath = path.join('./public', folder);

    await fsNode.promises.mkdir(folderPath, { recursive: true });

    const fileName = `${Date.now()}.webp`;
    const filePath = path.join(folderPath, fileName);

    await fsNode.promises.writeFile(filePath, buffer);

    return `/${folder}/${fileName}`;
  }
}
