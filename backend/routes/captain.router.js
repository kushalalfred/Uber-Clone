import express from "express";
import {body} from "express-validator";
import { getCaptainProfile, loginCaptain, logOutCaptain, registerCaptain } from "../controllers/captain.controller.js";
import { authenticateCaptain } from "../middleware/auth.middleware.js";

const router  = express.Router();

router.post("/register",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({min:3}).withMessage("First Name is required of minimum 3 characters"),
    body("password").isLength({min:6}).withMessage("Password is required of minimum 6 characters"),
    body("vehicle.color").isLength({min:3}).withMessage("Color is required of minimum 3 characters"),
    body("vehicle.capacity").isInt().withMessage("Capacity is required of minimum 1 digit"),
    body("vehicle.vehicleType").isIn(['car', 'motorcycle','auto']).withMessage("Type is required of car, motorcycle or auto"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate is required of minimum 3 characters"),
],registerCaptain);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Password is required of minimum 6 characters"),
],loginCaptain);

router.get("/profile",authenticateCaptain,getCaptainProfile)

router.get("/logout",authenticateCaptain,logOutCaptain)

export default router;