import userModel from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import captainModel from "../models/captain.model.js";
import blacklistTokenModel from "../models/blacklist_token.model.js";

export const authenticateUser = async(req,res,next)=>{
    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message : "Unauthorized User Please Authenticate !! User Token Not Found"
            });
        }

        const isBlacklisted = await blacklistTokenModel.findOne({token: token});
        if(isBlacklisted){
            return res.status(401).json({
                message : "Unauthorized User Please Authenticate"
            });
        }

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const user = await userModel.findById(decoded._id);
            // console.log("User: " + user);
            req.user = user;
            return next()
            
        }catch(error){
            console.log("Error Occured in Auth Middleware : ",error);
            return res.status(401).json({
                message : "Unauthorized User Please Authenticate"
            });
        }

    }catch(error){
        console.log("Error Occur Auth Middleware : ",error);
        res.status(500).json({
            message : "Internal Server Error Occured"
        });
    }
}

export const authenticateCaptain = async(req,res,next)=>{
    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1];

        if(!token){
            return res.status(401).json({
                message : "Unauthorized User Please Authenticate !! User Token Not Found"
            });
        }

        const isBlacklisted = await blacklistTokenModel.findOne({token: token});
        if(isBlacklisted){
            return res.status(401).json({
                message : "Unauthorized User Please Authenticate"
            });
        }

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const captain = await captainModel.findById(decoded._id);
    
            req.captain = captain;
            return next()
            
        }catch(error){
            console.log("Error Occured in Auth Middleware : ",error);
            return res.status(401).json({
                message : "Unauthorized User Please Authenticate"
            });
        }

    }catch(error){
        console.log("Error Occur Auth Middleware : ",error);
        res.status(500).json({
            message : "Internal Server Error Occured"
        });
    }
}