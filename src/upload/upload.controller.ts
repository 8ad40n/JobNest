// src/upload/upload.controller.ts
import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
    }

    // TODO: Implement logic for handling the file, e.g., saving to disk or cloud storage
    console.log(file);

    return { message: 'File uploaded successfully', filename: file.originalname };
  }
}
