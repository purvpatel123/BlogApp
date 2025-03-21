import express from "express";
import { register ,login,logout} from "../controller/user.controller.js";
const router=express.Router()

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
export default router;