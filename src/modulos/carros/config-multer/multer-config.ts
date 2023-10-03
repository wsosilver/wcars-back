import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const multerConfig = {
  storage: diskStorage({
    destination: './src/modulos/carros/imgs',
    filename: (req, file, cb) => {
      console.log('file: ', file);
      const fileName = uuidv4();
      if (file != null && file?.originalname != '') {
        const extension = path.parse(file.originalname).ext;
        cb(null, `${fileName}${extension}`);
      }
    },
  }),
};

export default multerConfig;
