import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3,"First Name must be 3 Characters long"]
        },
        lastname : {
            type : String,
            required : true,
            minlength : [3,"Last Name Must be 3 Characters long"]
        }
    },
    email : {
        type : String,
        required : true,
         
        minlength : [5,"Email Must be atleast 5 Characters"]
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    socketId : {
        type : String
    }
    
});

userSchema.methods.generateAuthToken = function(){
    try{
        const token = jwt.sign({
            _id: this._id
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return token
    }catch(error){
        console.log("Error Occured in Token : ",error)
    }
}

userSchema.methods.comparePassword = async function(password){
    try{
        const data =  await bcrypt.compare(password,this.password);
        return data;
    }catch(error){
        console.log("Error Occured in Compare Password : ",error)
    }
}
userSchema.statics.hashedPassword = async function(password){
    try{
        const data = await bcrypt.hash(password,10);
        return data;
    }catch(error){
        console.log("Error Occured In Hashed Password",error)
    }
}

const userModel = mongoose.model("user",userSchema);
export default userModel;