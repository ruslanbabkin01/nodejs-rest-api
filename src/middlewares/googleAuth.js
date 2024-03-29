const passport = require('passport')
const { Strategy } = require('passport-google-oauth2')
const { User } = require('../schemas')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const gravatar = require('gravatar')
const { v4 } = require('uuid')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/users/google/callback`,
  passReqToCallback: true,
}

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile
    const user = await User.findOne({ email })
    if (user) {
      return done(null, user) // req.user = user
    }
    // create password
    const hashPassword = await bcrypt.hash(v4(), 10)
    // create user avatar
    const avatarURL = gravatar.url(email)
    const verificationToken = v4()

    const newUser = await User.create({
      name: displayName,
      subscription: 'starter',
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
      verify: true,
    })
    done(null, newUser)
  } catch (error) {
    done(error, false)
  }
}

const googleStrategy = new Strategy(googleParams, googleCallback)

passport.use('google', googleStrategy)

module.exports = passport
