"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaFileFilter = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const upload_constant_1 = require("../constants/upload.constant");
const mediaFileFilter = (req, file, callback) => {
    const ext = (0, path_1.extname)(file.originalname).slice(1).toLowerCase();
    const isImageMime = upload_constant_1.UPLOAD_IMAGE_ALLOWED_MIME_TYPES.includes(file.mimetype);
    const isImageExt = upload_constant_1.UPLOAD_IMAGE_ALLOWED_TYPES.includes(ext);
    const isVideoMime = upload_constant_1.UPLOAD_VIDEO_ALLOWED_MIME_TYPES.includes(file.mimetype);
    const isVideoExt = upload_constant_1.UPLOAD_VIDEO_ALLOWED_TYPES.includes(ext);
    if ((isImageMime && isImageExt) || (isVideoMime && isVideoExt)) {
        return callback(null, true);
    }
    callback(new common_1.BadRequestException('File type is not supported'), false);
};
exports.mediaFileFilter = mediaFileFilter;
//# sourceMappingURL=upload.utils.js.map