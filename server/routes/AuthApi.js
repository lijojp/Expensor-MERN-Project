import {Router} from 'express'
import User from '../models/User.js';
import router from './TransactionsApi.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
 
router.post('/register',async (req,res)=>{
    //get all form data
    const {email, password, FirstName, LastName} = req.body

    //check if user exists with same email
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(406).json({"message":"user already exists"})
        return
    } 
    //if not hash password and save
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User({email, password:hashedPassword, FirstName, LastName})
    await user.save()

    res.status(201).json({'message':"user is created"})
})

router.post('/login', async(req,res)=>{
    const {email ,password} = req.body

    const userExists = await User.findOne({email})
    if(! userExists){
        res.status(406).json({"message":"credentials not found"})
        return
    } 

    const matched = await bcrypt.compare(password, userExists.password);
    if(! matched){
        res.status(406).json({"message":"credentials not found"})
        return
    }

    //create JWT token
    const payload ={
        userName : email,
        _id : userExists._id
    }
    const token = jwt.sign({payload}, 'some secret');
    res.status(200).json({"message":"succesfully logged in",token})
       
})

export default router;