const { Contact } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });

  return res.status(201).json(result);
};

module.exports = add;
