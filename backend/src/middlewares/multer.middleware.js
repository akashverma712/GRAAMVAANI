import multer from "multer";
import path from 'path';
import fs from 'fs';






const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"./public/temp")
    },
    filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', // Images
    'video/mp4', 'video/mpeg', // Videos
    'audio/mpeg', 'audio/mp3' // Audio
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, videos, or audio allowed.'), false);
  }
};

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per file
  fileFilter
}).fields([
  { name: 'image', maxCount: 1 }, // Single image
  { name: 'video', maxCount: 1 }, // Single video
  { name: 'audio', maxCount: 1 }  // Single audio
]);

const multerMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}


export default multerMiddleware;