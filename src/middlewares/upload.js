const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'tmp')

// fieldname	 - Field name specified in the form
// originalname - 	Name of the file on the user's computer
// destination - 	The folder to which the file has been saved
// filename	 - The name of the file within the destination
// path	- The full path to the uploaded file

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    // fileSize: 1,
  },
  // fileFilter
})

const upload = multer({
  storage: multerConfig,
})

module.exports = upload
