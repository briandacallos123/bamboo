import express from "express";
import { getCurrentUser, updateAccount } from "../controller/userController.js";
const route = express.Router();

route.get('/current-user',getCurrentUser )
route.post('/update-account', updateAccount)

export default route;