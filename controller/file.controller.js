import cloudinary from "../config/cloud.config.js";
import File from "../model/file.model.js";
import User from "../model/auth.model.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).json({
        success: false,
        message: "Filename is required",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "file",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    const file = await File.create({
      fileName,
      fileURL: result.secure_url,
      CreatedBy: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        file: file._id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file,
    });
  } catch (error) {
    console.log("File upload error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};