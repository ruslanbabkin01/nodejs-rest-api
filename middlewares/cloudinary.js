const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

const { CLOUD_NAME, API_CLOUD_KEY, API_CLOUD_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_CLOUD_KEY,
  api_secret: API_CLOUD_SECRET,
});

const uploadAvatarImage = async (pathFile) => {
  // Use the uploaded file's name as the asset's public ID and allow overwriting the asset with new versions
  const options = {
    folder: "userAvatars",
    use_filename: true,
    unique_filename: false,
    allowedFormats: ["jpg", "png", "webp"],
    overwrite: true,
    transformation: [
      { gravity: "face", height: 45, width: 45, crop: "fill" },
      { fetch_format: "auto" },
    ],
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(pathFile, options);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadAvatarImage };
