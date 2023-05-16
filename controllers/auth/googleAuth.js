require('dotenv').config()
const jwt = require('jsonwebtoken')

const { FRONT_URL } = process.env

const googleAuth = async (req, res) => {
  const { _id: id } = req.user
  const payload = { id }

  // const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
  //   expiresIn: '1m',
  // })
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
    expiresIn: '1d',
  })
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: '7d',
  })

  res.redirect(
    `${FRONT_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  )
}

module.exports = googleAuth
