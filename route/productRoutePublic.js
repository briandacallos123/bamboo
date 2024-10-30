import express from "express";
import { getAllProducts, getProduct, getProductsByQuery } from "../controller/productController.js";
const route = express.Router();


route.get('/', getAllProducts);
route.get('/:id', getProduct)
route.post('/search',getProductsByQuery)

export default route;