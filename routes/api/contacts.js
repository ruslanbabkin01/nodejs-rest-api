const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const {
  isValidId,
  auth,
  validation,
  ctrlWrapper,
} = require("../../middlewares");
const { schemas } = require("../../models");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.addJoiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(schemas.addJoiSchema),
  isValidId,
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(schemas.updateFavoriteSchema),
  isValidId,
  ctrlWrapper(ctrl.updateStatus)
);

module.exports = router;
