import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  create(type: FileType, file): string {
    try {
      const fileExtention = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtention;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  remove(name: string) {}
}
