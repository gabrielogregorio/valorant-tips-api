/* eslint-disable camelcase */
import multer_post from 'multer';

// https://github.com/expressjs/multer/blob/master/doc/README-pt-br.md

export const multerPost = multer_post({
  storage: multer_post.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    const accepted = ['image/gif', 'image/png', 'image/webp', 'image/jpg', 'image/jpeg'].find(
      (aceito) => aceito === file.mimetype,
    );

    if (accepted) {
      return cb(null, true); // Aceitar arquivo
    }
    return cb(null, false); // Rejeitar arquivo
  },
});
