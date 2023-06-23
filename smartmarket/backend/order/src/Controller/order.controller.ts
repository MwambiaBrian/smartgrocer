import {Router, Response,Request, NextFunction} from 'express';
import Controller from '../utils/interfaces/controller.interface';
import HttpException from '../utils/exceptions/http.exception';
import validationMiddleware from '../middlewares/error.middleware';
import validate from './order.validate'
import OrderService from '../Service/order.service';
import axios from 'axios'
import token from '../middlewares/getToken'



class OrderController implements Controller {
    public path = '/order'
    public router = Router();
    private order = new OrderService

    constructor() {
        this.initialiseRoutes();
       
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
           
           this.createOrder,
          
           
        );
        this.router.post(
            `${this.path}/callback_url`,
           
           this.darajaCallback,
          
           
        );
       
       
    }

    private  createOrder =  async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
        try {
            const {phoneNumber, amount} = req.body;
            this.stkPush(phoneNumber, amount)
           // this.order.create()
            // console.log(name)
            // const newbusiness = await this.business.create(name, businessEmail, ownerId, desc)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
             //res.json({ newbusiness}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }

private stkPush = async ( phoneNumber: string, amount: number)=>{

    const shortCode = 174379
    const phone = phoneNumber.substring(1)

    const passkey = "bfb279fbdbcf1..."
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
     const date = new Date();
     const timestamp = 
     date.getFullYear() +
     ("0" + (date.getMonth() +1)).slice(-2) +
     ("0" + (date.getDate() +1)).slice(-2) +
     ("0" + (date.getHours() +1)).slice(-2) +
     ("0" + (date.getMinutes() +1)).slice(-2) +
     ("0" + (date.getSeconds() +1)).slice(-2) 

     //const password = new Buffer.from(shortCOde + passkey + timestamp).toString("base64");

     const data = {
        BusinessShortCode: shortCode,
      //  Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: `254${phone}`,
        PartyB: 174379,
        PhoneNumber: `254${phone}`,
        callBackURL: "https://mydomain/callback_url",
        AccountReference: "Digital-Market",
        TransactionDesc: "Order payment"

     };

     await axios.post(url, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
     }).then((data) => {
        console.log(data)
        // res.status(200).json(data.data)
     }).catch((err)=>{
        console.log(err)
        // res.status(400).json(err.message)
     })

}



    private darajaCallback =  async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response |void> =>{
        try {
            const {id} = req.params;
            console.log(id);
            // const business = await this.business.retrieveById(id)
            // const newbusiness = await this.business.create(name, businessEmail,  ownerId, desc);
            //  res.send({ business}) 
        } catch(error: any) {
            next(new HttpException(400, error.message))
        }

    }

   
}

export default OrderController