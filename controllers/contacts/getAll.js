const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, "-createdAt -updatedAt");

    res.json({
      total: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
