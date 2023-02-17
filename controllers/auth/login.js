const { User } = require("../../models");
const { Unauthorized, BadRequest } = require("http-errors");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }

  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  if (!user.verify) {
    throw new BadRequest("Email not verify");
  }

  const token = generateToken(user._id);

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
