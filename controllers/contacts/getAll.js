const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json({
    total: contacts.length,
    data: contacts,
  });
};

module.exports = getAll;
