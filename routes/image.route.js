const { community } = require("../config/database");
const clearImage = require("../utils/clearImage");
// const path = require('path');

// Retrieve all Mosquees from the database.
exports.editImage = async (req, res, next) => {
  try {
    const { code, idMosque, lastImg } = req.body;
    if (!req.file) {
      const error = new Error("No image provided");
      error.statusCode = 422;
      error.data = [{ param: "logo", msg: "No image provided" }];
      throw error;
    }

    let image;
    if (req.file) {
      image = req.file.path.replace("\\", "/");
      clearImage(lastImg, "..");
    } else {
      image = lastImg;
    }
    const foundImage = await community.models.Image.findOne({
      where: { [`${code}_MosqueId`]: idMosque },
    });
    let editImages;
    if (foundImage) {
      foundImage.image_free = image;
      await foundImage.save();
    } else {
      editImages = await community.models.Image.create({
        image_free: image,
        [`${code}_MosqueId`]: idMosque,
      });
    }

    return res.status(200).json(editImages);
  } catch (error) {
    next(error);
  }
};