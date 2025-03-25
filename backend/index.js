import express from "express";
import cors from "cors"; 
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
const app = express()
dotenv.config()

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI
// console.log(MONGO_URL)

app.use(
    cors({
    origin: "http://localhost:5173",    // Your frontend origin
    credentials: true,               // Allow credentials (cookies, etc.)
    
}));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
    
}))

try {
    mongoose.connect(MONGO_URL);
    console.log("connected to mongodb");
} catch (error) {
    console.log(error);
}
 
//defining routes
app.use("/api/users", userRoute);
app.use("/api/blogs",blogRoute);



//cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret:process.env.CLOUD_SECRET_KEY
});

app.listen(port, () => {
    console.log(`example  listning on port ${port}`);

})

