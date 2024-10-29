import mongoose from "mongoose";
import {USER_ROLE} from '../utils/constants.js'

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    userRole:{
        type:String,
        default:USER_ROLE[0]
    },
    avatar:String,
    avatarPublicId:String
},{
    timestamps:true
})

export default mongoose.model('user', userSchema)