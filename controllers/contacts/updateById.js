const { NotFound } = require("http-errors");
const { schemas, Contact } = require("../../models");

const updateById = async (req, res, next) => {
  try {
    const { error } = schemas.addJoiSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
