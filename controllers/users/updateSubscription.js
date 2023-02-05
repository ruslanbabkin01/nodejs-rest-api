const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { id } = req.user;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json({
    message: `subscription updated to: ${user.subscription}!`,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = updateSubscription;
