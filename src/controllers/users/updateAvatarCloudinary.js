const { User } = require('../../schemas')
const fs = require('fs/promises')
const { uploadCloudinaryImage } = require('../../middlewares')

const updateAvatarCloudinary = async (req, res) => {
  const { path: upload } = req.file
  const { _id } = req.user

  const avatarURL = await uploadCloudinaryImage(upload)

  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })

  res.json({ avatarURL })
  fs.unlink(upload)
}

module.exports = updateAvatarCloudinary
