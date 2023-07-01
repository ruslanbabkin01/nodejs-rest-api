const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleSchemaValidationErrors } = require('../helpers')
const { EMAIL_REGEX, PHONE_REGEX, NAME_REGEX } = require('../constants/regexs')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      match: [NAME_REGEX, 'Only letters can be accepted'],
      minLength: 2,
      maxLength: 16,
    },
    email: {
      type: String,
      match: [EMAIL_REGEX, 'Please enter a valid email address'],
      trim: true,
      lowercase: true,
      minLength: 5,
      maxLength: 59,
    },
    number: {
      type: String,
      unique: true,
      required: [true, 'Set number for contact'],
      match: [PHONE_REGEX, 'Please enter a valid phone number'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
)

contactSchema.post('save', handleSchemaValidationErrors)

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
})

const addJoiSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().optional(),
  number: Joi.string().regex(PHONE_REGEX).required(),
  favorite: Joi.bool(),
})

const schemas = {
  addJoiSchema,
  updateFavoriteSchema,
}

const Contact = model('contact', contactSchema)

module.exports = { Contact, schemas }
