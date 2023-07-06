const { User } = require('../../schemas')

const updateSubscription = async (req, res) => {
  const { _id, name, email, subscription, avatarURL } = req.user

  const user = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  })

  res.json({
    message: `Subscription updated to: ${user.subscription}!`,
    user: {
      _id,
      name,
      email,
      subscription,
      avatarURL,
    },
  })
}

module.exports = updateSubscription
