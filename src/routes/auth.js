const express = require('express')
const { ctrlAuth } = require('../controllers')
const {
  authMiddleware,
  validation,
  ctrlWrapper,
  passport,
} = require('../middlewares')
const { userSchemas } = require('../schemas')

const router = express.Router()

// google Authorization
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)
// where google return
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  ctrlWrapper(ctrlAuth.googleAuth)
)

router.post(
  '/register',
  validation(userSchemas.registerJoiSchema),
  ctrlWrapper(ctrlAuth.register)
)
// or router.post("/signup")

router.post(
  '/login',
  validation(userSchemas.loginJoiSchema),
  ctrlWrapper(ctrlAuth.login)
)
// or router.post("/signin")

router.post('/logout', authMiddleware, ctrlWrapper(ctrlAuth.logout))
// or router.get("/signout")

// refresh router
router.post(
  '/refresh',
  validation(userSchemas.refreshJoiSchema),
  ctrlWrapper(ctrlAuth.refresh)
)

module.exports = router
