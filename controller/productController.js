import productModel from "../model/productModel.js"
import cloudinary from 'cloudinary'
import {promises as fs} from 'fs';

export const createProduct = async(req, res) => {


    try {
        if(req.file){
            const response = await cloudinary.v2.uploader.upload(req.file.path);
            await fs.unlink(req.file.path)
            req.body.attachment = response.secure_url;
            req.body.avatarPublicId = response.public_id
        }
        req.body.posttedBy = req.user._id

        await productModel.create({...req.body});
        res.status(200).json({msg:"Created successfully!"});
    } catch (error) {
        console.log(error,'ERR')
        res.status(500).json({error})
    }
}

export const getAllProductsByMerchant = async(req, res) => {
    const response = await productModel.find({posttedBy:req.user._id});
    res.status(200).json({data:response})
}

export const getProduct = async(req, res) => {
   
    try {
        const response = await productModel.findById(req.params.id);
      
        res.status(200).json({data:response});
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
}

export const getAllProducts = async(req, res) =>{
    const response = await productModel.find();
    res.status(200).json({data:response})
}


export const getProductsByQuery = async(req, res) => {
    try {
        const {boss} = req.body

        const result = await productModel.find({title:{ $regex: boss, $options: 'i' }})
       
        res.status(200).json({data:result})

       
       
    } catch (error) {
        res.status(500).json({error})
        
    }
}