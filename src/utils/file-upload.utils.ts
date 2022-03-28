import * as path from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';

const SAVE_IMG_PATH = path.join('static', 'images');
export const SECTIONS_IMAGE_PATH = path.join(SAVE_IMG_PATH, 'sections');
export const MAIN_LOGO_IMAGE_PATH = path.join(SAVE_IMG_PATH, 'main-logo');
export const ADVERTISEMENT_BANNER_IMG_PATH = path.join(SAVE_IMG_PATH, 'ad-banner');
export const FOOD_CATEGORY_IMG_PATH = path.join(SAVE_IMG_PATH, 'food-categories');

export type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};

export const createMulterOptions = (pathToSave: string): MulterOptions => {
  return {
    storage: diskStorage({
      destination: path.resolve(pathToSave),
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  };
};

export const checkIsFileNotEmpty = (file: Express.Multer.File | undefined) => {
  if (!file || !file.size) throw new HttpException('Загружаемый файл не должен быть пустым', HttpStatus.BAD_REQUEST);
};

const imageFileFilter = (req: any, file: MulterFile, cb: (error: Error | null, acceptFile: boolean) => void) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Допустима загрузка только изображений!'), false);
  }
  cb(null, true);
};

const editFileName = (req: any, file: MulterFile, cb: (error: Error | null, filename: string) => void) => {
  const name = file.originalname.split('.')[0];
  const extName = path.extname(file.originalname);
  const randomName = Array(6)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  const fullName = `${name}-${randomName}${extName}`.replace(/ /g, '');
  cb(null, fullName);
};
