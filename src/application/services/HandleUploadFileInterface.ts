export interface ProcessedImageInterface {
  data: Buffer;
  format: 'webp';
  height: number;
  width: number;
  sizeInBytes: number;
}

export interface HandleUploadFileInterface {
  process(input: { buffer: Buffer }): Promise<ProcessedImageInterface>;
}
