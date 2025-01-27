import { NextFunction,Request,Response } from "express";
import userModel from "../models/userModels";
import createCaptain from "../services/captainServices";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { captainModel } from "../models/captainModels";
import { blacklistModel } from "../models/blacklistModel";


export const registerCaptain=async(req:Request, res:Response, next:NextFunction)=>{
        
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
        return;
    }
   
    const {fullname,email,password,vechile}=req.body
   const isEmail = await captainModel.findOne({email});

   if(isEmail){
    res.status(401).json({message:"Email is already in use"})
    return;
   }

    const hashedpassword = await bcrypt.hash(password,10)
  

    const captain = await createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword,
        color:vechile.color,
        plate:vechile.plate,
        capacity:vechile.capacity,
        vechileType:vechile.vechileType
    });
    const captainId = captain._id;

    const token = jwt.sign({
        captainId
    },process.env.JWT_SECRET || "")

    res.status(200).json({token,captain})
    
}

export const loginCaptain = async (req:Request, res:Response, next:NextFunction)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty){
        res.status(400).json({errors:errors.array()})
        return;
    }
    const {email,password}=req.body;

    const captain = await captainModel.findOne({email})


    if(!captain){
        res.status(401).json({message:"Invalid email"})
    }

       //@ts-ignore
        const passwordMatch = await bcrypt.compare(password,captain.password)
         //@ts-ignore
        const captainId = captain._id
        if(passwordMatch){
            const token = jwt.sign({
                captainId
            },process.env.JWT_SECRET || "",{expiresIn: '24h'})

            res.cookie('token',token)

            res.json({
                token,
                captain
            })
        }else{
            res.status(401).json({message:"Incorrect password"})
        }

}

export const getCaptainProfile=(req:Request, res:Response, next: NextFunction)=>{
    //@ts-ignore
    res.status(201).json(req.captain)
}

export const logoutCaptain= async(req:Request, res:Response, next: NextFunction)=>{
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistModel.create({token});

    res.status(201).json({message:"Logged Out"})
}