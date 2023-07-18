import express from "express"
import bcrypt from "bcrypt"
import { Iuser } from "../models/user";

import jwt from "jsonwebtoken";
//import Seller from "../models/seller.js"
//import Customer from "../models/customer.js"
//import Rider from "../models/rider.js"



import {Router, Response,Request, NextFunction} from 'express';
import Controller from '../utils/interfaces/controller.interface';
import HttpException from '../utils/exceptions/http.exception';
import validationMiddleware from '../middleware/error.middleware';
import validate from './user.validate'
import UserService from '../Service/user';
import axios from 'axios'
//import token from '../middlewares/getToken'



class UserController implements Controller {
    public path = '/auth'
    public router = Router();
    private user = new UserService
  

    constructor() {
        this.initialiseRoutes();
       
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
           this.register,
          
          
           
        );
        this.router.get(
          `${this.path}`,
         this.getAllUsers,
        
        
         
      );
        this.router.post(
            `${this.path}/login`,
           
           this.login,
          
           
        );
       
       
    }

    private  getAllUsers =  async(
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response |void> =>{
    try {
      
      
      const users = await this.user.retrieve()
   
      res.json(users);
   
    } catch (err: any) {
      res.status(500).send(err.message);
    }

  }


    private  register =  async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
      try {
        
        const {name, email, password, role} = req.body;
        const newuser = await this.user.create(name, email, password, role)
        const token = jwt.sign(
          { 
            id: newuser._id,
            name: newuser.name,
            email: newuser.email,
            role: newuser.role
          }, 
          'mysecretkey');
        res.json({token});
     
      } catch (err: any) {
        res.status(500).send(err.message);
      }

    }


    private  login =  async(
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<Response |void> =>{
    try {
      const { email, password } = req.body;
      const user = await this.user.getUserByEmail(email);
    
      if (!user) throw new Error('User not found');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error('Invalid password');
      const token = jwt.sign(
       { 
         id: user._id,
         name: user.name,
         email: user.email,
         role: user.role
       }, 
       'mysecretkey');
      
      res.json({"token":token});
      console.log(`${user?.name} has logged in ${user}`)
   } catch (err: any) {
     res.status(401).send(err.message);
   }

  }

}
//import User from "../models/user.js"
//import {createUser, getUserByname} from "../Repository/user.js";
// Registration route for all roles

                          




   
 
export default UserController;