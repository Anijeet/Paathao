import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { blacklistModel } from "../models/blacklistModel";
import { captainModel } from "../models/captainModels";

export const captainMiddleware = async(req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){

        res.status(401).json({message:"Not found token"})
        return;
    }
    
const isBlacklisted = await blacklistModel.findOne({token: token})


if(isBlacklisted){
    res.status(401).json({message:"captain is logout"})
    
}

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "")

        //@ts-ignore
        
        //@ts-ignore
        const captain = await captainModel.findById(decoded.captainId)
        console.log(captain)
        // @ts-ignore
        req.captain=captain;

        //@ts-ignore
        return next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"Unauthorized"})
    }
}