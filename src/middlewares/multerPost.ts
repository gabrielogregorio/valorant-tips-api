import multer from 'multer';
import { Request } from 'express';

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
});
