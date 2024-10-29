import express from "express";
import { createProduct, getAllProducts, getAllProductsByMerchant, getProduct } from "../controller/productController.js";
const route = express.Router();

route.post('/', createProduct);
route.get('/', getAllProducts);
route.get('/merchant', getAllProductsByMerchant);
route.get('/:id', getProduct)


export default route;