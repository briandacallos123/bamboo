import express from "express";
import { createorder, getAllordersByCustomer,getOrderByCustomer, getAllordersByMerchant } from "../controller/orderController.js";
const route = express.Router();

route.post('/', createorder)
route.post('/customer', getAllordersByCustomer)
route.get('/merchant', getAllordersByMerchant)
route.get('/:id', getOrderByCustomer)



export default route;