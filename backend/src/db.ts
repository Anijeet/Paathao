import mongoose from "mongoose";

export default function connectToDb(){
    //@ts-ignore
    mongoose.connect(process.env.DB_CONNECT).then(()=>{
        console.log("Connected to MongoDB");
    }).catch(e=>console.log(e))
}