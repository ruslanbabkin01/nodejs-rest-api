const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

// Resizes image, then writes it in tje new directory and removes in the old one.

const resizeImage = async (imagePath, movePath, imageName) => {
  const img = await Jimp.read(imagePath);
  await img.resize(250, 250).writeAsync(imagePath);

  const resultUpload = path.join(movePath, imageName);
  await fs.rename(imagePath, resultUpload);

  return path.join(movePath, imageName);
};

module.exports = resizeImage;
