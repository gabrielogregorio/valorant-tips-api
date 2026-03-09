import multer from 'multer';
import { convertMegabytesToBytes } from '@/api/helpers/conversors';

const LIMIT_SIZE_UPLOAD_IN_BYTES = convertMegabytesToBytes(5); // 5mb

export const uploadPostImagesMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: LIMIT_SIZE_UPLOAD_IN_BYTES,
    files: 30,
  },
  fileFilter: (_req, file, callback) => {
    const allowedTypes = /jpeg|jpg|png/;

    if (allowedTypes.test(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('formato inválido'));
    }
  },
});
