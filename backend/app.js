import { configDotenv } from "dotenv";
import cors from "cors"
import express from "express";
import connectToDb from "./db/db.js";
import userRoutes from "./routes/user.router.js";
import captainRoutes from "./routes/captain.router.js";
import cookieParser from "cookie-parser";

configDotenv();

connectToDb();

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser()); 

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use("/users",userRoutes);
app.use("/captains",captainRoutes);



export default app;