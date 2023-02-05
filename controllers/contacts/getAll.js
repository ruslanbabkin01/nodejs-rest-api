const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  if (favorite) {
    const favoriteContacts = contacts.filter(
      (contact) => contact.favorite === true
    );

    res.json({
      total: favoriteContacts.length,
      data: favoriteContacts,
    });
    return;
  }

  res.json({
    total: contacts.length,
    data: contacts,
  });
};

module.exports = getAll;
