import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { extname } from 'path';
import { UPLOAD_IMAGE_ALLOWED_MIME_TYPES, UPLOAD_IMAGE_ALLOWED_TYPES, UPLOAD_VIDEO_ALLOWED_MIME_TYPES, UPLOAD_VIDEO_ALLOWED_TYPES } from '../constants/upload.constant';

export const mediaFileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const ext = extname(file.originalname).slice(1).toLowerCase();
  const isImageMime = UPLOAD_IMAGE_ALLOWED_MIME_TYPES.includes(file.mimetype);
  const isImageExt = UPLOAD_IMAGE_ALLOWED_TYPES.includes(ext);

  const isVideoMime = UPLOAD_VIDEO_ALLOWED_MIME_TYPES.includes(file.mimetype);
  const isVideoExt = UPLOAD_VIDEO_ALLOWED_TYPES.includes(ext);

  if ((isImageMime && isImageExt) || (isVideoMime && isVideoExt)) {
    return callback(null, true);
  }

  callback(new BadRequestException('File type is not supported'), false);
};
