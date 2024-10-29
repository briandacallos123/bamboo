import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import authRoute from './route/authRoute.js'
import productRoute from './route/productRoute.js'
import productPublicRoute from './route/productRoutePublic.js'
import orderRoute from './route/orderRoute.js'

import {dirname} from 'path';
import {fileURLToPath} from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/authMiddleware.js';
import userRoute from './route/userRoute.js'
import upload from './utils/upload.js';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = dirname(fileURLToPath(import.meta.url));



const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, './public')));
app.use(cookieParser())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user',authMiddleware, userRoute)
app.use('/api/v1/product',authMiddleware,upload.single('attachment'), productRoute)
app.use('/api/v1/public/product', productPublicRoute)
app.use('/api/v1/orders',authMiddleware, orderRoute)

app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__dirname,'./public','index.html'))
})

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View Credentials' below to copy your API secret
});


try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, ()=>{

        console.log("Listening on port: ", process.env.PORT);
    })
} catch (err) {
    console.log(err);
}