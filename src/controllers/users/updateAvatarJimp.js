const { User } = require('../../schemas')
const path = require('path')
const { resizeImage } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file
  const { _id } = req.user

  // change name
  const newNameImg = `${_id}_${originalname}`

  const avatarURL = await resizeImage(tmpUpload, avatarsDir, newNameImg)

  await User.findByIdAndUpdate(_id, { avatarURL })

  res.json({
    avatarURL,
  })
}

module.exports = updateAvatar
