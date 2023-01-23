const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { isValidId } = require("../../middlewares");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.add);

router.delete("/:contactId", isValidId, ctrl.removeById);

router.put("/:contactId", isValidId, ctrl.updateById);

router.patch("/:contactId/favorite", isValidId, ctrl.updateStatus);

module.exports = router;
