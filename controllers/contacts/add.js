const { schemas, Contact } = require("../../models");

const add = async (req, res, next) => {
  try {
    const { error } = schemas.addJoiSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
