
import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createBlog = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "blog image is required" });
        }

        const { blogImage } = req.files;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(blogImage.mimetype)) {
            return res.status(400).json({ message: "Invalid image format. Only JPEG, PNG, and WEBP are allowed." });
        }

        const { title, category, about } = req.body;
        if (!title || !category || !about) {
            return res.status(400).json({ message: "title,category and about fields are required" });
        }

        const adminName = req?.user?.name;
        const adminPhoto = req?.user?.photo?.url;
        const createdBy = req?.user?._id;

        const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error('Cloudinary Upload Error:', cloudinaryResponse.error);
            return res.status(500).json({ message: "Failed to upload blog" });
        }

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
        const blog = await Blog.create(blogData);
        res.status(201).json({
            message: "blog created successfully",
            blog,
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: "An error occurred during registration", error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ message: "blog not found" });
    }

    // Optional: Delete blog image from Cloudinary
    if (blog.blogImage?.public_id) {
        await cloudinary.uploader.destroy(blog.blogImage.public_id);
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
};

export const getAllBlogs = async (req, res) => {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
};

export const getSingleBlogs = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "invalid blog id" });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ message: "Blog is not found" });
    }
    res.status(200).json(blog);
};

export const getMyBlogs = async (req, res) => {
    const createdBy = req.user._id;
    const myBlogs = await Blog.find({ createdBy });
    res.status(200).json(myBlogs);
};

// ✅ Updated updateBlog with correct handling
export const updateBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "invalid Blog Id" });
    }

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Update fields if present
        const { title, category, about } = req.body;
        if (title) blog.title = title;
        if (category) blog.category = category;
        if (about) blog.about = about;

        // Check if blogImage is provided in req.files
        if (req.files && req.files.blogImage) {
            const blogImage = req.files.blogImage;
            const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
            if (!allowedFormats.includes(blogImage.mimetype)) {
                return res.status(400).json({ message: "Invalid image format" });
            }

            // Delete old image from Cloudinary if exists
            if (blog.blogImage?.public_id) {
                await cloudinary.uploader.destroy(blog.blogImage.public_id);
            }

            const cloudinaryResponse = await cloudinary.uploader.upload(blogImage.tempFilePath);
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return res.status(500).json({ message: "Failed to upload new blog image" });
            }

            blog.blogImage = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            };
        }

        await blog.save();
        res.status(200).json({ message: "Blog updated successfully", blog });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred during blog update", error: error.message });
    }
};
