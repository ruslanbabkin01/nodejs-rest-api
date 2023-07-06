const express = require('express')
const { ctrlContacts } = require('../controllers')
const {
  isValidId,
  authMiddleware,
  validation,
  ctrlWrapper,
} = require('../middlewares')
const { schemas } = require('../schemas')

const router = express.Router()

router.use(authMiddleware)

router.get('/', ctrlWrapper(ctrlContacts.getAll))

router.get('/:contactId', isValidId, ctrlWrapper(ctrlContacts.getById))

router.post(
  '/',
  validation(schemas.addJoiSchema),
  ctrlWrapper(ctrlContacts.add)
)

router.delete('/:contactId', isValidId, ctrlWrapper(ctrlContacts.removeById))

router.put(
  '/:contactId',
  validation(schemas.addJoiSchema),
  isValidId,
  ctrlWrapper(ctrlContacts.updateById)
)

router.patch(
  '/:contactId/favorite/',
  validation(schemas.updateFavoriteSchema),
  isValidId,
  ctrlWrapper(ctrlContacts.updateStatus)
)

module.exports = router
