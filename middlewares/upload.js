import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

// User avatar upload
export const userAvatarUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'gracemountain/users',
      // allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'ico', 'svg'],
    },
  }),
});

export const tesimonyMediaUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder: 'gracemountain/testimonies',
        resource_type: 'auto', // ensures Cloudinary detects image/video/audio/document
      };
    },
  }),
});