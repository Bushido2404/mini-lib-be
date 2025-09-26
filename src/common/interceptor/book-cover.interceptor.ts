import { diskStorage, FileFilterCallback } from 'multer';
import { extname } from 'path';

export const bookCoverInterceptor = {
  storage: diskStorage({
    destination: './storages/covers',
    filename: (req, file, cb) => {
      const filename = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = extname(file.originalname);
      cb(null, `cover-${filename}${extension}`);
    },
  }),
  fileFilter: (req, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};
