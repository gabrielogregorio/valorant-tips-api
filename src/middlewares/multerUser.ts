import { convertMegabytesToBytes } from '@/helpers/conversors';
import { Request } from 'express';
import multer from 'multer';

const LIMIT_SIZE_UPLOAD_IN_BYTES: number = convertMegabytesToBytes(10);

export const multerUser = multer({
  limits: {
    fileSize: LIMIT_SIZE_UPLOAD_IN_BYTES,
  },
  storage: multer.diskStorage({
    destination: (_request: Request, _file, callback) => {
      callback(null, './public/images/users');
    },
    filename: (_request: Request, file, callback) => {
      callback(null, `${file.fieldname}-${Date.now()}`);
    },
  }),

  fileFilter: (_request: Request, file, callback) => {
    const accepted = !!['image/gif', 'image/png', 'image/webp', 'image/jpg', 'image/jpeg'].find(
      (accept) => accept === file.mimetype,
    );

    return callback(null, accepted);
  },
});
