const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

// destination, filename determine where the file will be located after downloading:
// destination is used to specify the directory where the files will be placed
// filename is used to define what the file inside the directory will be named
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
