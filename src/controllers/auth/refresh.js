require('dotenv').config()
const { User } = require('../../schemas')
const { Forbidden } = require('http-errors')
const jwt = require('jsonwebtoken')

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY)
    const isExist = await User.findOne({ refreshToken: token })
    if (!isExist) {
      throw new Forbidden('Token invalid')
    }

    const payload = { id }

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: '1d',
    })
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: '7d',
    })

    res.json({ accessToken, refreshToken })
  } catch (error) {
    throw new Forbidden('Token invalid')
  }
}

module.exports = refresh
