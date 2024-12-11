import {v2} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME , 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = awaitcloudinary.uploaded.upload(localFilePath,{
            resouce_type:"auto"
        })
        console.log("file uploaded on cloudinary",
        response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved file as the upload failed
        return null;
        
    }
}