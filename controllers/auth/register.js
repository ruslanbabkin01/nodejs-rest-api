const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { sendEmail, RequestError } = require("../../helpers");
const { v4: uuid } = require("uuid");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);

  const verificationToken = uuid();
  const newUser = await User.create({
    subscription,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Confirmation of registration on the website",
    html: `<a href="${process.env.BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to confirm email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
      verificationToken,
    },
  });
};

module.exports = register;
