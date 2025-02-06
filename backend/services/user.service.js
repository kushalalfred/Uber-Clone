import userModel from "../models/user_model.js";

export const createUser = async({
    firstname,lastname,email,password
})=>{
    try{
        if(!firstname || !email || !password){
            throw new Error("All Fields Are Required");
        }        

        const user = new userModel({
            fullname: { firstname, lastname },
            email,
            password,
        });

        await user.save();  // This saves the user to the databas
       
        return user;

    }catch(error){
        console.log("Error Occured in user Service",error.message);;
    }
}