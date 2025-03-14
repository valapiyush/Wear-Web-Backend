const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: "dhd658u4t",
    api_key: "397493733748159",
    api_secret: "T2xIgd8Jr8vPLtNF_91wIoNLW_U",
  });

  const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
  console.log(cloudinaryResponse)
  return cloudinaryResponse;
};
module.exports = {
  uploadFileToCloudinary,
};
