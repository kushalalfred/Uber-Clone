import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3, 'First name must be at least 3 characters long'],
        },
        lastname : {   
            type : String,
            minlength : [3, 'Last name must be at least 3 characters long'],
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match : [/.+\@.+\..+/, 'Please fill a valid email address'],
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    socketId : {
        type : String,
    },
    status : {
        type : String,
        enum : ['active', 'inactive'],
        default : 'inactive',
    },
    vehicle : {
        color : {
            type : String,
            required : true,
            minlength : [3, 'Color must be at least 3 characters long'],
        },
        plate : {
            type : String,
            required : true,
            minlength : [3, 'Plate must be at least 3 characters long'],
        },
        capacity : {
            type : Number,
            required : true,
            min : [1, 'Capacity must be at least 1'],
        },
        vehicleType : {
            type : String,
            enum : ['car', 'motorcycle','auto'],
            required : true,
        },
        location : {
            lat : {
                type : Number
            },
            lng : {
                type : Number
            }
        }
    }
});


captainSchema.methods.generateAuthToken = function() {
    try{
        const token = jwt.sign({
            _id: this._id
        }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return token
    }catch(error){
        console.log("Error Occured in Token captain Model: ",error)
    }
}

captainSchema.methods.comparePassword = async function(password){
    try{
        const data =  await bcrypt.compare(password,this.password);
        return data;
    }catch(error){
        console.log("Error Occured in Compare Password captain Model: ",error)
    }
}

captainSchema.statics.hashedPassword = async function(password){
    try{
        const data = await bcrypt.hash(password,10);
        return data;   
    }
    catch(error){
        console.log("Error Occured In Hashed Password captain Model: ",error);
    }
}

const captainModel = mongoose.model('captain', captainSchema);
export default captainModel;