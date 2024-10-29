import { verifyToken } from "../utils/tokenUtils.js";

export const authMiddleware = (req, res, next) =>{
    const {token} = req.cookies;
    if(!token) res.status(500).json({msg:"Token not provided!"});
    const isVerified = verifyToken(token);
    if(!isVerified) res.status(500).json({msg:"Invalid token."});

    req.user = {
        _id:isVerified?.userId,
        role:isVerified?.userRole
    }
    next();
}