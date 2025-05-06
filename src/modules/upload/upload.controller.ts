import { Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Auth } from "../../common/decorators/auth.decorator";
import { UploadService } from "./upload.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { UPLOAD_MEDIA_MAX_SIZE } from "../../common/constants/upload.constant";
import { mediaFileFilter } from "../../common/utils/upload.utils";

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) { }

  @Get('medias')
  getMedias() {
    return this.uploadService.getMedias()
  }

  @Post('media')
  @Auth()
  @UseInterceptors(
    FilesInterceptor('files', 10, { 
      storage: memoryStorage(),
      fileFilter: mediaFileFilter,
      limits: {
        fileSize: UPLOAD_MEDIA_MAX_SIZE,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  uploadMedias(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploadMedias(files);
  }
  

  @Delete('media/:id')
  @Auth()
  deletemedia(@Param('id') id: string) {
    return this.uploadService.deletemedia(id);
  }
}