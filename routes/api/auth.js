const express = require("express");

const { auth: ctrlAuth, users: ctrlUser } = require("../../controllers");
const {
  authMiddleware,
  validation,
  ctrlWrapper,
  upload,
  passport,
} = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

// google Authorization
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
// where google return
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrlAuth.googleAuth
);

router.post(
  "/register",
  validation(userSchemas.registerJoiSchema),
  ctrlWrapper(ctrlAuth.register)
);
// or router.post("/signup")

router.post(
  "/login",
  validation(userSchemas.loginJoiSchema),
  ctrlWrapper(ctrlAuth.login)
);
// or router.post("/signin")

router.post("/logout", authMiddleware, ctrlWrapper(ctrlAuth.logout));
// or router.get("/signout")

router.get("/current", authMiddleware, ctrlWrapper(ctrlUser.getCurrent));

// refresh router
router.post(
  "/refresh",
  validation(userSchemas.refreshJoiSchema),
  ctrlWrapper(ctrlAuth.refresh)
);

router.patch(
  "/",
  authMiddleware,
  validation(userSchemas.updateSubJoiSchema),
  ctrlWrapper(ctrlUser.updateSubscription)
);

router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatarURL"),
  ctrlWrapper(ctrlUser.updateAvatarCloudinary)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrlUser.verifyEmail));

router.post(
  "/verify",
  validation(userSchemas.verifyEmailJoiSchema),
  ctrlWrapper(ctrlUser.resendVerifyEmail)
);

module.exports = router;
