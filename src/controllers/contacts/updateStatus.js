const { NotFound } = require('http-errors')
const { Contact } = require('../../schemas')

const updateStatus = async (req, res) => {
  const { contactId } = req.params
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }

  res.json(contact)
}

module.exports = updateStatus
