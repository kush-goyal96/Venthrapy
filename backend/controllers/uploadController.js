import cloudinary from "../config/cloudinary.js";

const streamUpload = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export const handleUpload = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file provided" });

    const type = (req.body.type || "image").toLowerCase();
    const folderSuffix = req.body.folder ? `/${req.body.folder}` : "";
    const folderBase = process.env.CLOUDINARY_UPLOAD_FOLDER || "uploads";

    // Cloudinary uses resource_type: "image" | "video"; audio goes under video
    const resourceType =
      type === "audio" ? "video" : type === "video" ? "video" : "image";

    const result = await streamUpload(req.file.buffer, {
      folder: `${folderBase}${folderSuffix}`,
      resource_type: resourceType,
    });

    res.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      bytes: result.bytes,
      format: result.format,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};
