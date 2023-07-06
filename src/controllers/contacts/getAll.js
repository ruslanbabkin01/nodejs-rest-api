const { Contact } = require('../../schemas')

const getAll = async (req, res) => {
  const { _id: owner } = req.user
  const { page = 1, limit = 20, favorite } = req.query
  const skip = (page - 1) * limit
  const query = { owner }

  if (typeof favorite !== 'undefined') {
    query.favorite = favorite
  }

  const contacts = await Contact.find(query, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  })
  // .populate('owner', '_id name email subscription avatarURL')

  res.json({
    contacts,
  })
}

module.exports = getAll
