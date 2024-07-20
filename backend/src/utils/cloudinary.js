import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

(async function () {
	// Configuration
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
	});

	// Upload an image
	const uploadResult = async (localFilePath) => {
		try {
			if (!localFilePath) return null;
			const response = await cloudinary.uploader
				.upload(localFilePath, {
					resource_type: "auto",
				})
				.catch((error) => {
					console.log(error);
				});
			console.log("File is uploaded", response.url);
		} catch (error) {
			console.log("File not uploaded local file path is not found", error);
			fs.unlinkSync(localFilePath); //removed locally saved temporary file
			return null;
		}
	};
	console.log(uploadResult);
})();
