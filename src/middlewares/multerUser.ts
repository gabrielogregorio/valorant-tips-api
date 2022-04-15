import { Request } from 'express';
import multer from 'multer';

export const multerUser = multer({
  storage: multer.diskStorage({
    destination: (request: Request, file, callback) => {
      callback(null, './public/images/users');
    },
    filename: (request: Request, file, callback) => {
      callback(null, `${file.fieldname}-${Date.now()}`);
    },
  }),

  fileFilter: (request: Request, file, callback) => {
    const accepted = !!['image/gif', 'image/png', 'image/webp', 'image/jpg', 'image/jpeg'].find(
      (accept) => accept === file.mimetype,
    );

    return callback(null, accepted);
  },
});
