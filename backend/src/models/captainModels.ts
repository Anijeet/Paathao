import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"Length must be minimum 3 characters"]
        },
        lastname:{
            type:String,
            minlength:[2,"Length must be minimum 3 characters"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:[2,"Minimum 2 characketrs required"]   
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vechile :{
        color:{
            type:String,
            required:true
        },
        plate:{
            type:String,
            required:true
        },
        capacity:{
            type:Number,
            required:true,
            min:[2,'Capacity must be 2']
        },
        vechileType:{
            type:String,
            required:true,
            enum:['car','bike','auto','motorcycle']
        }
    },
    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }

    }
})

export const captainModel = mongoose.model('captain', captainSchema)
