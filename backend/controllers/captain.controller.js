import BlacklistToken from '../models/blacklist_token.model.js';
import  captainModel from '../models/captain.model.js';
import { createCaptain } from '../services/captain.service.js';
import { validationResult } from 'express-validator';

export const registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(),
            message : "Please Validate Fields Before Submitting"});
        };

        const {email, fullname, password, vehicle} = req.body;

        const userUnique = await captainModel.findOne({email}).select("+password");
        if(userUnique){
            return res.status(400).json({
                message : "Captain Already Exists"
            });
        }

        const hashedPassword = await captainModel.hashedPassword(password);
        const captain = await createCaptain({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashedPassword,
            plate : vehicle.plate,
            capacity : vehicle.capacity,
            vehicleType : vehicle.vehicleType,
            color : vehicle.color
        });
        const token = captain.generateAuthToken();

        return res.status(201).json({message: "Captain Registered Successfully", token,captain});

    }catch(error){
        console.log("Error in registerCaptain", error);
        return res.status(500).json({message: "Internal Server Error While Registering Captain"});
    }
}

export const loginCaptain = async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors : errors.array(),
                message : "Please Validate Fields"
            });
        }
        
        const {email,password} = req.body;
        const captain = await captainModel.findOne({email}).select("+password");
        if(!captain){
            return res.status(401).json({
                message : "Invalid Credentials"
            })
        }

        const isMatch = await captain.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({
                message : "Invalid Credentials"
            })
        }

        const token = captain.generateAuthToken();
        
        res.cookie("token",token);

        return res.status(200).json({
            token,captain,
            message : "Captain Logged In"
        });

    }catch(error){
        console.log("Error in loginCaptain", error);
        return res.status(500).json({message: "Internal Server Error While Logging In Captain"});
    }
}

export const getCaptainProfile = async (req, res) => {
    try{
        const captain = req.captain;
        return res.status(200).json({captain});
    }catch(error){
        console.log("Error in getCaptainProfile", error);
        return res.status(500).json({message: "Internal Server Error While Getting Captain Profile"});
    }
}

export const logOutCaptain = async (req, res) => {
    try{
        res.clearCookie("token");

        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        const removeToken = new BlacklistToken({token});
        await removeToken.save();
        
        return res.status(200).json({message: "Captain Logged Out"});

    }catch(error){
        console.log("Error Occured in LogOut Captain Controller: ",error);
        return res.status(500).json({message: "Internal Server Error While Logging Out Captain"});
    }
}