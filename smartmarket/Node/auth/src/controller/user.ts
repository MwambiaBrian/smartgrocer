import express from "express"
import { Iuser } from "../models/user";
import { createUser, getUserByname } from "../repository/user";
import jwt from "jsonwebtoken";
//import Seller from "../models/seller.js"
//import Customer from "../models/customer.js"
//import Rider from "../models/rider.js"


const controller = express.Router()
import bcrypt from "bcrypt"
//import User from "../models/user.js"
//import {createUser, getUserByname} from "../Repository/user.js";
// Registration route for all roles

                          

controller.post('/register', async (req, res) => {
  try {
    const user: Iuser = {
      
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    
    const newuser = await createUser(user)
    const token = jwt.sign(
      { 
        id: newuser._id,
        name: newuser.name,
        email: newuser.email
      }, 
      'mysecretkey');
    res.json({token});
  //  res.json({"sign up":"successful"});
     // res.json({user});
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}) 



controller.post("/login", async (req, res)=>{
  try {
       const { email, password } = req.body;
       const user = await getUserByname(email);
      // console.log(user)
       if (!user) throw new Error('User not found');
       const isPasswordValid = await bcrypt.compare(password, user.password);
       if (!isPasswordValid) throw new Error('Invalid password');
       const token = jwt.sign({ userId: user._id,}, 'mysecretkey');
       res.json({"token":token});
    //  res.json({"login":"successful"});
    } catch (err: any) {
      res.status(401).send(err.message);
    }
  
  })



controller.post('/resetpassword', async (req, res) => {
    try {
      // register(req.body)
   
     
      // const user = new Seller({ username, email, password});
      // await user.save();
      // const token = jwt.sign({ userId: user._id }, 'mysecretkey');
      // res.status(201).json({ token });
      res.json({"password": "successful"});
    } catch (err) {
      //res.status(500).send(err.message);
    }
  }) 

  
controller.post("/verify", async (req, res)=>{
    try {
      //   const { username, email, password, address} = req.body;
      //  register()
      //   const user = new Customer({ username, email, password,address});
     
      //   await user.save();
      //   console.log(user.__t)
      //   const token = jwt.sign({ userId: user._id, userRole: user.__t }, 'mysecretkey');
      //   res.status(201).json({ token });
      res.json({"verification":"successful"});
      } catch (err) {
       // res.status(500).send(err.message);
      }
    
    }) 
    controller.post("/authenticate", async (req, res)=>{
      try {
        //   const { username, email, password, address} = req.body;
        //  register()
        //   const user = new Customer({ username, email, password,address});
       
        //   await user.save();
        //   console.log(user.__t)
        //   const token = jwt.sign({ userId: user._id, userRole: user.__t }, 'mysecretkey');
        //   res.status(201).json({ token });
        res.json({"authenticated":"successful"});
        } catch (err) {
         // res.status(500).send(err.message);
        }
      
      }) 
   
 
export default controller;