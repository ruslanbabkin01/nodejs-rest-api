require('dotenv').config()
const { User } = require('../../schemas')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { sendEmail, RequestError } = require('../../helpers')
const { v4: uuid } = require('uuid')

const register = async (req, res, next) => {
  const { email, password, subscription, name } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw RequestError(409, 'User with this email already exists!')
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const avatarURL = gravatar.url(email)

  const verificationToken = uuid()
  const newUser = await User.create({
    name,
    subscription,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  })

  const mail = {
    to: email,
    subject: 'Confirmation of registration on the website',
    html: `<a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to confirm email</a>`,
  }
  await sendEmail(mail)

  res.status(201).json({
    user: {
      name,
      email,
      subscription: newUser.subscription,
      verificationToken,
      id: newUser._id,
    },
  })
}

module.exports = register
