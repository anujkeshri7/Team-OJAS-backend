import GalleryModel from "../models/galleryModel.js";

import cloudinary from "../config/cloudinary.js";

const uploadImagesController = async (req, res) => {

    try {
        
        const { title } = req.body;

        if(!title || !req.files || req.files.length === 0){
            return res.status(400).json({
                success: false,
                message: "Title and at least one image are required",
            })
        }

        const uploadedImages =  req.files.map(file => {
            return  cloudinary.uploader.upload(file.path, {
                folder: "ojas/gallery",
            })
        });

        const results = await Promise.all(uploadedImages);

        const existingGallery = await GalleryModel.findOne({ title });

        if(existingGallery){
            existingGallery.images.push(...results.map(img => ({ url: img.secure_url, publicId: img.public_id })));
            await existingGallery.save();
            return res.status(200).json({
                success: true,
                message: "Images added to existing gallery",
                data: existingGallery
            })
        }

       
        const galleryImage = new GalleryModel({
            title,
            images: results.map(img => ({ url: img.secure_url, publicId: img.public_id }))
        });

        await galleryImage.save();

        res.status(201).json({
            success: true,
            message: "Images uploaded successfully",
            data: galleryImage
        });

    } catch (error) {

        console.log("Error uploading images to Cloudinary:", error);
        res.status(500).json({
            success: false,
            message: "Error uploading images",
            error: error.message,
        })
        
    }
}

const fetchGalleryImages = async (req, res) => {

    try {

        const galleryImages = await GalleryModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: galleryImages
        })
        
    } catch (error) {
            console.log("Error fetching gallery images:", error);
            res.status(500).json({
                success: false,
                message: "Error fetching gallery images",
                error: error.message,
            })
        
    }
}

const deleteGalleryImage = async (req, res) => {
    const { publicId } = req.body;
    console.log("Public ID to delete:", publicId);
    try {

       const response= await cloudinary.uploader.destroy(publicId);

        if(response.result !== "ok"){
            return res.status(400).json({
                success: false,
                message: "Error deleting image from Cloudinary",
            })
        }

        const galleryImage = await GalleryModel.findOneAndUpdate(
            { "images.publicId": publicId },
            { $pull: { images: { publicId } } },
            { returnDocument: "after" }
        );

        const image = await GalleryModel.findOne({"title": galleryImage.title});
        if(image.images.length === 0){
            await GalleryModel.findByIdAndDelete(galleryImage._id);
        }



        res.json({
            success: true,
            message: "Image deleted successfully",
        })


        
    } catch (error) {
            console.log("Error deleting gallery image:", error);
            res.json({
                success: false,
                message: "Error deleting gallery image",
                error: error.message,
            })
        
    }
}

export { uploadImagesController, fetchGalleryImages, deleteGalleryImage };

