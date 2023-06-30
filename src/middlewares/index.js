const isValidId = require('./isValidId')
const ctrlWrapper = require('./ctrlWrapper')
const validation = require('./validation')
const authMiddleware = require('./authMiddleware')
const upload = require('./upload')
const passport = require('./googleAuth')
const uploadCloudinaryImage = require('./uploadCloudinaryImage')
const errorRoutesHandler = require('./errorRoutesHandler')
const errorHandler = require('./errorHandler')

module.exports = {
  isValidId,
  ctrlWrapper,
  validation,
  authMiddleware,
  upload,
  passport,
  uploadCloudinaryImage,
  errorRoutesHandler,
  errorHandler,
}
