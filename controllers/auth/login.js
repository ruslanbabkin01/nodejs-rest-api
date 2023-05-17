const { User } = require('../../models')
const { Unauthorized, BadRequest } = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new Unauthorized('Email or password is wrong')
  }

  const passCompare = bcrypt.compareSync(password, user.password)
  if (!passCompare) {
    throw new Unauthorized('Email or password is wrong')
  }

  if (!user.verify) {
    throw new BadRequest('Email not verify')
  }

  const payload = {
    id: user._id,
  }

  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
    expiresIn: '1d',
  })
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: '7d',
  })
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken })

  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      email,
      subscription: user.subscription,
      name: user.name,
    },
  })
}

module.exports = login
