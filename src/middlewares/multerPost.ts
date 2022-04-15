import multer from 'multer';
import { Request } from 'express';
import { convertMegabytesToBytes } from '@/helpers/conversors';

const LIMIT_SIZE_UPLOAD_IN_BYTES = convertMegabytesToBytes(10);

export const multerPost = multer({
  storage: multer.diskStorage({
    destination: (request: Request, file: any, callback: any) => {
      callback(null, './public/images');
    },
    filename: (request: Request, file: any, callback: any) => {
      callback(null, `${file.fieldname}-${Date.now()}`);
    },
  }),

  fileFilter: (request: Request, file, callback) => {
    const accepted: boolean = !!['image/gif', 'image/png', 'image/webp', 'image/jpg', 'image/jpeg'].find(
      (accept) => accept === file.mimetype,
    );

    return callback(null, accepted);
  },

  limits: {
    fileSize: LIMIT_SIZE_UPLOAD_IN_BYTES,
  },
});
