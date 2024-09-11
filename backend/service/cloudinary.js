import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } =
  process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (
  path,
  folder = "portfolio-image",
  oldPublicId = null
) => {
  try {
    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }
    console.log("folder in cld", folder);

    const data = await cloudinary.uploader.upload(path, {
      folder,
      transformation: [
        { width: 800, height: 600, crop: "fit" },
        { quality: "auto", fetch_format: "auto" },
      ],
    });
    return { url: data.secure_url, public_id: data.public_id };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to upload image");
  }

  // Optimize delivery by resizing and applying auto-format and auto-quality
  // const optimizeUrl = cloudinary.url("shoes", {
  //   fetch_format: "auto",
  //   quality: "auto",
  // });

  // console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  // const autoCropUrl = cloudinary.url("shoes", {
  //   crop: "auto",
  //   gravity: "auto",
  //   width: 500,
  //   height: 500,
  // });

  // console.log(autoCropUrl);

  // res.send("File uploaded successfully");
};
export { uploadToCloudinary, cloudinary };
