import userModel from "../models/userModels";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { addSyntheticTrailingComment } from "typescript";
import { blacklistModel } from "../models/blacklistModel";

export const authMiddleware = async(req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){

        res.status(401).json({message:"Not found token"})
        return;
    }
    
const isBlacklisted = await blacklistModel.findOne({token: token})


if(isBlacklisted){
    res.status(401).json({message:"user is logout"})
    
}

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "")

        //@ts-ignore
        
        //@ts-ignore
        const user = await userModel.findById(decoded.userId)
        
        // @ts-ignore
        req.user=user;

        //@ts-ignore
        return next()
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"Unauthorized"})
    }
}