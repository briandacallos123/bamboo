import orderModel from "../model/orderModel.js"
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import productModel from "../model/productModel.js"

export const createorder = async(req, res) => {
    try {
        console.log(req.body,'???????')

       let payload = req.body.map((item)=>{
        return {
            ...item,
            customerId: req.user._id,
            
        }
       })
        await orderModel.insertMany(payload)
        res.status(200).json({msg:"created successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
        
    }
}

export const getAllordersByCustomer = async(req, res) => {
    try {
        const totalRecords =  await orderModel.countDocuments({customerId:req.user._id})
        const data = await orderModel.find({customerId:req.user._id}).limit(req.body.take).skip(req.body.skip);
        // const totalExpenses = await orderModel.find({customerId:req.user._id})

        const totalExpenses = await orderModel.aggregate([
            {
                $match: {
                    customerId:  new ObjectId(req.user._id) // Filtering documents where _id equals 1
                },
             
            },
            {
                $group: {
                  _id: null, // No grouping, just summing all the amounts
                  totalAmount: { $sum: "$value" },
                },
              },
           
          ]);
      

        res.status(200).json({
            data:{
                data,
                totalRecords,
                totalExpenses:totalExpenses?.length ? totalExpenses[0]:0
            }
        })
    } catch (error) {
        res.status(500).json({error})
        
    }
}

export const getAllordersByMerchant = async(req, res) => {
    try {

        const data = await orderModel.find({sellerId:req.user._id});

        console.log(data,'DATAAA', req.user._id)
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({error})
        
    }
}

export const getOrderByCustomer = async(req, res)=>{
    try {
        let data = await orderModel.findById(req.params.id);

        
        const product = await productModel.findById(data?.productId);
        
        const productDetails = {
            title:product?.title,
            price:product?.price,
            quantity:product?.quantity,
            category:product?.category,
            description:product?.description
        }
        
        data = {...data?._doc, productDetails}
     
        res.status(200).json({data});
    } catch (error) {
        console.log(error,'???')
        res.status(500).json({error});
    }
}



