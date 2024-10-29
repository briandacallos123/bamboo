import userModel from "../model/userModel.js"
import { hashPass } from "../utils/passwordHelper.js";


export const getCurrentUser = async(req, res) => {
    const user = await userModel.findById(req.user._id);
    if(!user) return res.status(404).json({msg:"User not found"});

    res.status(200).json({data:user})
}

export const updateAccount = async(req, res) => {
    let password;
    if(req.body.password){
        password = await hashPass(req.body.password)
    }
    console.log(req.user);
    req.body.password = password
    await userModel.findOneAndUpdate({
        _id:req.user._id
    },{...req.body},{new:true})

    res.status(200).json({msg:"Updated successfully"})
}