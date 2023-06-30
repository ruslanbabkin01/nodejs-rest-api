const { User } = require('../../schemas')

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { accessToken: null, refreshToken: null })

  res.status(204).json({
    message: 'Logout success',
  })
}

module.exports = logout