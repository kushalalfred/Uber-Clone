import captainModel from '../models/captain.model.js';

export const createCaptain = async ({firstname,lastname,email,password,color,plate,capacity,vehicleType}) => {
    try {
        if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
            throw new Error("All fields are required");
        }

        const captain = new captainModel({
            fullname : {
                firstname,
                lastname
            },
            email,
            password,
            vehicle : {
                color,
                plate,
                capacity,
                vehicleType
            }
        });
        return await captain.save();
    } catch (error) {
        console.log("Error Occured in Create Captain Service: ",error);
        throw new Error(error);
    }
};