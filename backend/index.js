import express from "express";
import dotenv from "dotenv";
const app=express()
dotenv.config()

const port=process.env.PORT;

app.get("/",(req,res)=>{
    res.send("hello world")
});

app.listen(port,()=>{
    console.log(`example  listning on port ${port}`);
    
})