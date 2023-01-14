import {Router} from 'express'
import User from '../models/User.js';
import router from './TransactionsApi.js';
import bcrypt from "bcrypt";
 
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

export default router;