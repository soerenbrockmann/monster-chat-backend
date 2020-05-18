import multer from 'multer';

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, 'images/');
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

export const uploadMiddleware = upload.single('avatar');
