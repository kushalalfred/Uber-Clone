import userModel from "../models/user_model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklist_token.model.js";


export const registerUser = async(req,res,next)=>{
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors : errors.array(),
                message : "Please Validate Fields"
            });
        }
        
        const {fullname,email,password} = req.body;
        // console.log(req.body);
        // return;

        const userUnique = await userModel.findOne({email}).select("+password");
        if(userUnique){
            return res.status(400).json({
                message : "User Already Exists"
            });
        }


        const hashedPassword = await userModel.hashedPassword(password);
        const user = await createUser({
            firstname :fullname.firstname,lastname:fullname.lastname,email,password : hashedPassword
        })

       

        const token = user.generateAuthToken();
        
        res.status(201).json({
            token,user,
            message : "User Registered"
        });


    }catch(error){
        console.log("Error Occured in User Controller : ",error)
        return res.status(500).json({
            message : "Internal Server Error Occured While Registering User"
        });

    }
}

export const loginUser = async(req,res,next)=>{
    try{
 
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors : errors.array(),
                message : "Please Validate Fields"
            });
        }

        const {email,password} = req.body;
        const user = await userModel.findOne({email}).select("+password");

        if(!user){
            return res.status(401).json({
                message : "Invalid Credentials"
            })
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                message : "Invalid Credentials"
            })
        }
        const token = user.generateAuthToken();
        
        res.cookie("token",token);

        return res.status(200).json({
            token,user,
            message : "User Logged In"
        });
 
    }
    catch(error){
        console.log("Error Occured in User Controller Login : ",error);
        return res.status(500).json({
            message : "Internal Server Error Occured While Logging In User"
        });
    }
}

export const getUserProfile = async(req,res,next)=>{
    try{
        res.status(200).json({
            user : req.user
        });

    }catch(error){
        console.log("Error Occured in User Controller Get Profile : ",error)
        res.status(500).json({
            message : "Internal Server Error Occured While Fetching User Profile"
        });
    }
}

export const logOutUser = async(req,res,next)=>{
    try{
        res.clearCookie("token");

        const token = req.cookies.token || req.headers.authorization.split(" ")[1];
        
        const removeToken = new BlacklistToken({token});
        await removeToken.save();

        res.status(200).json({
            message : "User Logged Out"
        });
    }
    catch(error){
        console.log("Error Occured in User Controller Logout : ",error)
        res.status(500).json({
            message : "Internal Server Error Occured While Logging Out User"
        });
    }
}