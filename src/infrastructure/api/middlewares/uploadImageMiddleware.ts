import multer from 'multer';
import { convertMegabytesToBytes } from '@/api/helpers/conversors';

const LIMIT_SIZE_UPLOAD_IN_BYTES = convertMegabytesToBytes(5); // 5mb

export const uploadImageMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: LIMIT_SIZE_UPLOAD_IN_BYTES,
    files: 1, // limita a 1 arquivo
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

export const uploadImagesMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: LIMIT_SIZE_UPLOAD_IN_BYTES,
    files: 20, // 👈 Ajuste: Aumente para limitar ao tanto de imagens simultâneas permitidas (ex: 10 steps)
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
