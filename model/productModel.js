import mongoose from "mongoose";
import { PR_CATEGORY } from "../utils/constants.js";

const productSchema = new mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    category:{
        type:String,
        enum:PR_CATEGORY
    },
    quantity:Number,
    attachment:String,
    attachmentPublicId:String,
    posttedBy:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
})

export default mongoose.model('product', productSchema)