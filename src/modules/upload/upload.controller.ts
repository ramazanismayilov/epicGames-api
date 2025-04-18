import { Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Auth } from "src/common/decorators/auth.decorator";
import { UploadService } from "./upload.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { UPLOAD_IMAGE_MAX_SIZE } from "src/common/constants/upload.constant";
import { imageFileFilter } from "src/common/utils/upload.utils";

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) { }

  @Get('images')
  allImages() {
    return this.uploadService.allImages()
  }

  @Post('image')
  @Auth()
  @UseInterceptors(
    FilesInterceptor('images', 10, { 
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: UPLOAD_IMAGE_MAX_SIZE,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploadImages(files);
  }
  

  @Delete('image/:id')
  @Auth()
  deleteImage(@Param('id') id: string) {
    return this.uploadService.deleteImage(id);
  }
}