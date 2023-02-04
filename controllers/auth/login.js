const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);

  if (!user || !passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  const { SECRET_KEY } = process.env;
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);

  res.status(200).json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
