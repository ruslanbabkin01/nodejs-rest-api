const express = require('express')
const { ctrlUser } = require('../controllers')
const {
  authMiddleware,
  validation,
  ctrlWrapper,
  upload,
} = require('../middlewares')
const { userSchemas } = require('../schemas')

const router = express.Router()

router.get('/current', authMiddleware, ctrlWrapper(ctrlUser.getCurrent))

router.patch(
  '/',
  authMiddleware,
  validation(userSchemas.updateSubJoiSchema),
  ctrlWrapper(ctrlUser.updateSubscription)
)

router.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatarURL'),
  ctrlWrapper(ctrlUser.updateAvatarCloudinary)
)

router.get('/verify/:verificationToken', ctrlWrapper(ctrlUser.verifyEmail))

router.post(
  '/verify',
  validation(userSchemas.verifyEmailJoiSchema),
  ctrlWrapper(ctrlUser.resendVerifyEmail)
)

module.exports = router
