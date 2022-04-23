import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import {
  ALLOWED_EXTENSIONS,
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_MIMETYPES,
} from '../constant';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, cb) => {
          const { originalname } = file as Express.Multer.File;
          const ext: string = originalname.split('.').pop();
          const filename = `${v4()}.${ext}`;
          cb(null, filename);
        },
      }),
      limits: {
        fileSize: 100 * 1024 * 1024 * 1024,
        files: 20,
      },
      fileFilter: (req, file, cb) => {
        const { originalname, mimetype } = file as Express.Multer.File;
        const ext: string = originalname.split('.').pop().toLowerCase();

        let allowExt: string = ALLOWED_EXTENSIONS.find((e) => e === ext);

        if (allowExt == null) {
          cb(
            new HttpException('Not allowed file', HttpStatus.BAD_REQUEST),
            false,
          );
        }

        allowExt = ALLOWED_IMAGE_EXTENSIONS.find((e) => e === ext);
        if (allowExt != null) {
          const mime = ALLOWED_IMAGE_MIMETYPES.find(
            (mime) => mime === mimetype,
          );

          if (mime == null) {
            cb(
              new HttpException(
                'Not allowed image file',
                HttpStatus.BAD_REQUEST,
              ),
              false,
            );
          }
        }

        cb(null, true);
      },
    } as MulterOptions;
  }
}
