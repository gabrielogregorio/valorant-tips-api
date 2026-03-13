export interface StorageServiceInterface {
  upload(folder: string, buffer: Buffer): Promise<string>;
}
