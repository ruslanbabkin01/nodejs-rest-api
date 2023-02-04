const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = await User.create({
      subscription,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      user: {
        email,
        subscription: newUser.subscription,
      },
    });

};

module.exports = register;
