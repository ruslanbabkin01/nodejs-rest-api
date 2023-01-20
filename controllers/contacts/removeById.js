const { removeContact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      message: "contact deleted",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
