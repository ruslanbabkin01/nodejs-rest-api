const { NotFound } = require('http-errors')
const { Contact } = require('../../schemas')

const removeById = async (req, res) => {
  const { contactId } = req.params
  const contact = await Contact.findByIdAndRemove(contactId)

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }

  res.json({
    message: 'Contact successfully removed',
    contact,
  })
}

module.exports = removeById
