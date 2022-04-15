import { Request } from 'express';
import multer from 'multer';
import { convertMegabytesToBytes } from '@/helpers/conversors';

const LIMIT_SIZE_UPLOAD_IN_BYTES: number = convertMegabytesToBytes(10);

const diskStorage = multer.diskStorage({
  destination: (_request: Request, _file, callback) => {
    callback(null, './public/images/users');
  },
  filename: (_request: Request, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}`);
  },
});

export const multerUser = multer({
  storage: diskStorage,
  limits: {
    fileSize: LIMIT_SIZE_UPLOAD_IN_BYTES,
  },

  fileFilter: (_request: Request, file, callback) => {
    const accepted = !!['image/gif', 'image/png', 'image/webp', 'image/jpg', 'image/jpeg'].find(
      (accept) => accept === file.mimetype,
    );

    return callback(null, accepted);
  },
});
