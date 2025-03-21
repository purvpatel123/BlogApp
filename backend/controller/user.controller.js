// import { User } from "../models/user.model.js";
// import { v2 as cloudinary } from 'cloudinary';

// export const register = async (req, res) => {
//     //for uploading photo
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).json({ messagee: "user photo is required" });
//     }
//     const { photo } = req.files;
//     const allowedFormats = ["image/jpeg", "image/png","image/webp"]
//     if (!allowedFormats.includes(photo.mimetype)) {
//         return res.status(400).json({ message: "invalid photo formate.only jpeg and png are allowed" });
//     }

//     //for all  data
//     const { email, name, password, phone, education, role } = req.body;
//     if (!email || !name || !password || !phone || !education || !role ||!photo) {
//         return res.status(400).json({ message: "all field are required" });
//     }
//     const user = await User.findOne({ email })
//     if (user) {
//         return res.status(400).json({ message: "user already exists with this email" });
//     }

//     const cloudinaryResponse=await cloudinary.uploader.upload(
//         photo.tempFilepath
//     )
// if(!cloudinaryResponse || cloudinaryResponse.error){
//     console.log(cloudinaryResponse.error)
// }

//     const newUser = new User({ email, name, password, phone, education, role,photo:{
//         public_id:cloudinaryResponse.public_id,
//         url:cloudinaryResponse.url,
//     } });
//     await newUser.save()
//     if (newUser) {
//         res.status(201).json({ message: "user registered succesfuuly",newUser });
//     }
// };


import { User } from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";

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


const hashedPassword=await bcrypt.hash(password,10);

        // Create and save new user
        const newUser = new User({
            email,
            name,
            password:hashedPassword,
            phone,
            education,
            role,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.url,
            },
        });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully", newUser });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: "An error occurred during registration", error: error.message });
    }
};

