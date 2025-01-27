import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name must be minimum 3 characters"]
        },
        lastname:{
            type:String,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    socketId:{
        type:String
    }
})


userSchema.methods.comparePassword = async function(){
    //@ts-ignore
    return await bcrypt.compare(password, this.password)
}


const userModel = mongoose.model('user',userSchema)

export default userModel;