import userModel from "../models/userModels";


export default async function createUser({firstname,lastname,email,password}:any){

    try {
        if(!firstname || !email || !password){
            throw new Error('All fields are required.')
        }
    } catch (error) {
        console.log(error)
    }
    

    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })

    return user
}