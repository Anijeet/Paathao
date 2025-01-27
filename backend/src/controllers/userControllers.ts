import { NextFunction,Request,Response } from "express";
import userModel from "../models/userModels";
import { blacklistModel } from "../models/blacklistModel";
import createUser from "../services/userServices";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const registerUser=async(req:Request, res:Response, next:NextFunction)=>{
        
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
        return;
    }
   
    const {fullname,email,password}=req.body
   const isEmail = await userModel.findOne({email});
   
      if(isEmail){
       res.status(401).json({message:"Email is already in use"})
       return;
      }

    const hashedpassword = await bcrypt.hash(password,10)
  

    const user = await createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedpassword
    });
    console.log(user)
    const userId = user._id;

    const token = jwt.sign({
        userId
    },process.env.JWT_SECRET || "")

    res.status(200).json({token,user})
    
}

export const loginUser = async (req:Request, res:Response, next:NextFunction)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty){
        res.status(400).json({errors:errors.array()})
        return;
    }
    const {email,password}=req.body;

    const user = await userModel.findOne({email})


    if(!user){
        res.status(401).json({message:"Invalid email"})
    }

       //@ts-ignore
        const passwordMatch = await bcrypt.compare(password,user.password)
         //@ts-ignore
        const userId = user._id
        if(passwordMatch){
            const token = jwt.sign({
                userId
            },process.env.JWT_SECRET || "",{expiresIn: '24h'})

            res.cookie('token',token)

            res.json({
                token,
                user
            })
        }else{
            res.status(401).json({message:"Incorrect password"})
        }

}

export const getUserProfile=(req:Request, res:Response, next: NextFunction)=>{
    //@ts-ignore
    res.status(201).json(req.user)
}

export const logoutUser= async(req:Request, res:Response, next: NextFunction)=>{
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistModel.create({token});

    res.status(201).json({message:"Logged Out"})
}