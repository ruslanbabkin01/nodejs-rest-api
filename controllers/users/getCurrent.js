const getCurrent = async (req, res) => {
  const { subscription, email, name } = req.user

  res.json({
    user: {
      subscription,
      email,
      name,
    },
  })
}

module.exports = getCurrent
