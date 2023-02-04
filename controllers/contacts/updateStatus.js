const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.json(result);
};

module.exports = updateStatus;
