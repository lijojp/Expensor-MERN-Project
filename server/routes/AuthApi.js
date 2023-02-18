import {Router} from 'express'
import User from '../models/User.js';
import router from './TransactionsApi.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
// import * as AuthController from "../controller/AuthController"
import { register, login } from "../controller/AuthController.js"
 
router.post('/register',register)

router.post('/login', login)

export default router;