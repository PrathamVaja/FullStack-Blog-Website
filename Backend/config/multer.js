import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedTypes = ["jpg", "jpeg", "png", "webp"];
  const ext = path.extname(file.originalname).toLowerCase().slice(1);

  if (!allowedTypes.includes(ext)) {
    return cb(new Error("Only image files are allowed!"), false);
  }

  cb(null, true);
}

const upload = multer({ storage, fileFilter });

export default upload;
