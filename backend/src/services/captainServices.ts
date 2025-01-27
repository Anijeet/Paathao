import { captainModel } from "../models/captainModels";

export default async function createCaptain({firstname,lastname,email,password,color,plate,vechileType,capacity}:any){
    try {
        if(!firstname || !email || !password || !color || !plate || !vechileType || !capacity){
            throw new Error('All fields are required.')
        }
    } catch (error) {
        console.log(error)
    }
    

    const captain = await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vechile:{
            color,
            plate,
            vechileType,
            capacity
        }
    })

    return captain
}