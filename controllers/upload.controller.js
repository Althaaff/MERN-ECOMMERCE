import { asyncHandler } from "../middlewares/asyncHandler.js";

export const uploadImages = asyncHandler(async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const images = req.files.map((file) => ({
      public_id: file.filename,
      url: file.path,
    }));

    return res.status(200).json({
      success: true,
      message: "image uploaded successfully",
      images,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Image upload failed" });
  }
});
