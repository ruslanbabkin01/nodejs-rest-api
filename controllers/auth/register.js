const { User, userSchemas } = require("../../models");
const { Conflict } = require("http-errors");

const register = async (req, res, next) => {
  try {
    const { error } = userSchemas.registerJoiSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }

    const newUser = await User.create(req.body);
    res.status(201).json({
      user: {
        email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
