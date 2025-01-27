import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400  //in 24 hrs in sec
    }
});

export  const blacklistModel = mongoose.model('BlacklistToken',blacklistSchema)