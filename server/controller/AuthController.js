import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const categories = [
    { label:'Travel', icon: 'user' },
    { label:'Food', icon: 'user' },
    { label:'Shopping', icon: 'user'},
    { label:'Investment', icon: 'user'},
    { label:'Bills', icon: 'user'},
  ]

export const register = async (req,res)=>{
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

    const user = await User({
           email,
           password:hashedPassword,
           FirstName,
           LastName,
           categories,
        })
        

    await user.save()

    res.status(201).json({'message':"user is created"})
}

export const login = async(req,res)=>{
    const {email ,password} = req.body
    const userExists = await User.findOne({email})
    // console.log("Authcontroller",userExists);
    
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
    let a=10
    const token = jwt.sign({payload}, process.env.JWT_SECRET);
    res.status(200).json({"message":"succesfully logged in", token, userExists})
}