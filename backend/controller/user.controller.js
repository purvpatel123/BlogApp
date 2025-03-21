import { User } from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js"


export const register = async (req, res) => {
    try {
        // Check if photo is provided
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "User photo is required" });
        }

        const { photo } = req.files;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({ message: "Invalid photo format. Only JPEG, PNG, and WEBP are allowed." });
        }

        // Validate other required fields
        const { email, name, password, phone, education, role } = req.body;
        if (!email || !name || !password || !phone || !education || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Upload photo to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);//upload photo to cloudinary
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error('Cloudinary Upload Error:', cloudinaryResponse.error);
            return res.status(500).json({ message: "Failed to upload photo" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            phone,
            education,
            role,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        });
        await newUser.save();
        if (newUser) {
            const token = await createTokenAndSaveCookies(newUser._id, res)
            return res.status(201).json({ message: "User registered successfully", newUser, token: token });

        }
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: "An error occurred during registration", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: "please fill required fields" });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user.password) {
            return res.status(400).json({ message: "user password is missing" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "invalid email or password" });
        }
        if (user.role !== role) {
            return res.status(400).json({ error: `given role ${role} not found` });
        }
        const token = await createTokenAndSaveCookies(user._id, res);
        res.status(200).json({
            message: "user logged in succesfully", user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

            }, token: token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "internal server error" });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "User logged out succesfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "internal server error" })
    }
}