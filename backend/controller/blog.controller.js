import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
export const createBlog = async (req, res) => {
    try {
        // Check if blog image is provided
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "blog image is required" });
        }

        const { blogImage } = req.files;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(blogImage.mimetype)) {
            return res.status(400).json({ message: "Invalid image format. Only JPEG, PNG, and WEBP are allowed." });
        }

        // Validate other required fields
        const {title,category,about } = req.body;
        if (!title || !category || !about) {
            return res.status(400).json({ message: "title,category and about fields are required" });
        }

        //admin photo from database and admin name
        const adminName=req?.user?.name;
        const adminPhoto=req?.user?.photo;
       const createdBy=req?.user?._id;

        // Upload photo to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(
            blogImage.tempFilePath
        );    //upload photo to cloudinary
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error('Cloudinary Upload Error:', cloudinaryResponse.error);
            return res.status(500).json({ message: "Failed to upload blog" });
        }


       
        // Create and save blog
        const blogData = {
            title,
            about,
            category,
            adminName,
            adminPhoto,
            createdBy,

            blogImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        };
        const blog=await Blog.create(blogData);
      res.status(201).json({
        message:"blog created succesfully",
        blog,
      })
        
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: "An error occurred during registration", error: error.message });
    }
};