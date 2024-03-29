require('dotenv').config()
const { User } = require('../../schemas')
const { NotFound } = require('http-errors')

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })

  if (!user) {
    throw NotFound('User not found')
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  })

  res.redirect(
    `${process.env.FRONT_URL}/login?verificationToken=${verificationToken}`
  )
}

module.exports = verifyEmail
