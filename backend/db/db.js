import mongoose from "mongoose";

const connectToDb = async()=>{
    try{
        mongoose.connect(process.env.DB_Connect);
        console.log("Connected to Mongo")
    }catch(error){
        console.log("Failed To Connect to Db")
    }

}

export default connectToDb;