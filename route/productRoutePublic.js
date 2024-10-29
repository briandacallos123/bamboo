import express from "express";
import { getAllProducts, getProduct } from "../controller/productController.js";
const route = express.Router();


route.get('/', getAllProducts);
route.get('/:id', getProduct)

export default route;