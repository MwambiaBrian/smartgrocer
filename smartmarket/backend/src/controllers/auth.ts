import express from "express"
import axios from "axios"
import { Iuser } from "../models/user"

const controller = express.Router()

controller.post("/signup", (req, res)=>{
    const apiUrl = 'http://localhost:5001/api/auth/register'
   // const requestBody = {
   //    name: req.body.name,
   //    email: req.body.email,
   //    password:req.body.password,
   //    address: req.body.address,
   //    vehicleType:req.body.vehicleType, 
   
   //  };
   const user: Iuser = {
      
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
// console.log("auth service")
 axios.post(apiUrl, user).then((response)=>{
 res.send(response.data)
})
//res.send("Hello,express register")
})

controller.post("/signin", (req, res)=>{
   const apiUrl = 'http://localhost:5001/api/auth/login'
   const user: Iuser = {
      
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
// console.log("auth service")
 axios.post(apiUrl,user).then((response)=>{
 res.send(response.data)})
//res.send(response.data)
})
controller.post("/forgotpassword", (req, res)=>{
    const apiUrl = 'http://localhost:5001/auth/api/resetpassword'
   // const requestBody = {
   //    name: req.body.name,
   //    email: req.body.email,
   //    password:req.body.password,
   //    address: req.body.address,
   //    vehicleType:req.body.vehicleType, 
   
   //  };
// console.log("auth service")
 axios.post(apiUrl).then((response)=>{
   res.send(response.data)})
//res.send("Hello,express forgot password")
})
controller.post("/verifyaccount", (req, res)=>{
   const apiUrl = 'http://localhost:5001/auth/api/verify'
   // const requestBody = {
   //    name: req.body.name,
   //    email: req.body.email,
   //    password:req.body.password,
   //    address: req.body.address,
   //    vehicleType:req.body.vehicleType, 
   
   //  };
// console.log("auth service")
axios.post(apiUrl).then((response)=>{
    res.json(response.data)})
//res.send("Hello,express verify account")
})
export default controller;