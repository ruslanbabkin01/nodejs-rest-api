const { NotFound } = require('http-errors')
const { Contact } = require('../../schemas')

const getById = async (req, res) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }

  res.json(contact)
}

module.exports = getById
