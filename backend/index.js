import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoute from "./routes/user.route.js"
const app = express()
dotenv.config()

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI
// console.log(MONGO_URL)

try {
    mongoose.connect(MONGO_URL);
    console.log("connected to mongodb");
} catch (error) {
    console.log(error);
}

app.use("/api/users", userRoute)

app.listen(port, () => {
    console.log(`example  listning on port ${port}`);

})