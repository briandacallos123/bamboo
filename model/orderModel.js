import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productName:String,
    price:Number,
    quantity:Number,
    value:Number,
    deliveryAddress:String,
    sellerId:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    customerId:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    attachment:String,
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"product"
    }
},{
    timestamps:true
})

export default mongoose.model('OrderModel', orderSchema)