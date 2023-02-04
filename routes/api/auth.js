const express = require("express");

const { auth: ctrl, users } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
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

router.post("/logout", auth, ctrlWrapper(ctrl.logout));
// router.get("/signout")

router.get("/current", ctrlWrapper(users.getCurrent));

module.exports = router;
