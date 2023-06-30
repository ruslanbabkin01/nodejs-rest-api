const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async data => {
  // eslint-disable-next-line no-useless-catch
  try {
    const email = { ...data, from: 'ruslan.babkin01@gmail.com' }
    await sgMail.send(email)
    return true
  } catch (error) {
    throw error
  }
}

module.exports = sendEmail
