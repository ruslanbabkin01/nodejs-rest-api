const express = require("express");

const { auth: ctrl, users: ctrlUser } = require("../../controllers");
const {
  authMiddleware,
  validation,
  ctrlWrapper,
} = require("../../middlewares");
const { userSchemas } = require("../../models");

const router = express.Router();

router.post(
  "/register",
  validation(userSchemas.registerJoiSchema),
  ctrlWrapper(ctrl.register)
);
// router.post("/signup")

router.post(
  "/login",
  validation(userSchemas.loginJoiSchema),
  ctrlWrapper(ctrl.login)
);
// router.post("/signin")

router.post("/logout", authMiddleware, ctrlWrapper(ctrl.logout));
// router.get("/signout")

router.get("/current", authMiddleware, ctrlWrapper(ctrlUser.getCurrent));

router.patch(
  "/",
  authMiddleware,
  validation(userSchemas.updateSubJoiSchema),
  ctrlWrapper(ctrlUser.updateSubscription)
);

module.exports = router;
