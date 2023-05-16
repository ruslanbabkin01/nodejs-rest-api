const { User } = require("../../models");
const fs = require("fs/promises");
const { uploadAvatarImage } = require("../../middlewares/cloudinary");

const updateAvatarCloudinary = async (req, res) => {
  const { path: upload } = req.file;
  const { _id } = req.user;

  const avatarURL = await uploadAvatarImage(upload);

  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.json({ avatarURL });
  fs.unlink(upload);
};

module.exports = updateAvatarCloudinary;
