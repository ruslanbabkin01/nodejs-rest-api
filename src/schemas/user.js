const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minLength: 6,
    },
    name: {
      type: String,
      required: [true, 'Set name for user'],
      match: [
        /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
        'Only letters can be accepted',
      ],
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, 'Please enter a valid email address'],
      minLength: 5,
      maxLength: 59,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

const registerJoiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
  subscription: Joi.string(),
  accessToken: Joi.string(),
})

const loginJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegex).required(),
})

const updateSubJoiSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

const verifyEmailJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
})

const refreshJoiSchema = Joi.object({
  refreshToken: Joi.string().required(),
})

const User = model('user', userSchema)

const userSchemas = {
  registerJoiSchema,
  loginJoiSchema,
  updateSubJoiSchema,
  verifyEmailJoiSchema,
  refreshJoiSchema,
}

module.exports = {
  userSchemas,
  User,
}
