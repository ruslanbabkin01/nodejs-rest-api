const getCurrent = async (req, res) => {
  const { subscription, email, name, _id, avatarURL } = req.user

  res.json({
    _id,
    name,
    email,
    subscription,
    avatarURL,
  })
}

module.exports = getCurrent
