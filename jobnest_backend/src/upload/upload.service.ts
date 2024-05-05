import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  // Specify the directory for file uploads
  private readonly uploadDirectory = 'uploads';

  constructor() {
    // Ensure the upload directory exists
    if (!fs.existsSync(this.uploadDirectory)) {
      fs.mkdirSync(this.uploadDirectory, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    // Generate a unique filename
    const fileExtension = path.extname(file.originalname);
    const fileName = uuidv4() + fileExtension;
    const filePath = path.resolve(this.uploadDirectory, fileName);

    // Move the file to the upload directory
    fs.writeFileSync(filePath, file.buffer);

    return `File saved as ${fileName}`;
  }
}
