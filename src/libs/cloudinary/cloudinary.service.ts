import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_TOKEN'),
    });
  }

  async uploadFile(file: Express.Multer.File) {
    let result: any = await new Promise((resolve, reject) =>
      cloudinary.uploader
        .upload_stream((err, result) => {
          if (err) return reject(err);
          resolve(result);
        })
        .end(file.buffer),
    );

    return { url: result?.url, type: file.mimetype };
  }
}
