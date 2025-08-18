import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

const createTokenAndSaveCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
       httpOnly:true, 
    // httpOnly:false,  
        secure:true,
        sameSite:"strict"   // "strict" for same-site cookies, "lax" for same-site lax cookies
        // sameSite:"none",   // for cross-site cookies
    })
    await User.findByIdAndUpdate(userId,{token})
    return token;
}

export default createTokenAndSaveCookies;


