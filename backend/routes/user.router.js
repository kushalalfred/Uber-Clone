import express from "express";
import {body} from "express-validator";
import { getUserProfile, loginUser, logOutUser, registerUser } from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";


const router  = express.Router();

router.post('/register',[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({min : 3}).withMessage("First Name Must be Atleast 3 Characters"),
    body("password").isLength({min : 6}).withMessage("Password Must be 6 Characters Long")
],registerUser);


router.post("/login",[
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("password").isLength({min : 6}).withMessage("Password Must be 6 Characters Long")
    ],
    loginUser
])

router.get("/profile",authenticateUser,getUserProfile);

router.get("/logout",authenticateUser,logOutUser);

export default router;