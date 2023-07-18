import { Router, Response, Request, NextFunction } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import HttpException from '../utils/exceptions/http.exception';
import validationMiddleware from '../middlewares/error.middleware';
import validate from './order.validate';
import OrderService from '../Service/order.service';
import axios from 'axios';
import token from '../middlewares/getToken';

class OrderController implements Controller {
  public path = '/order';
  public router = Router();
  private order = new OrderService();
  private token = null;

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      this.createOrderMiddleware,
      this.createOrder
    );
    this.router.get(
      `${this.path}`,
      
      this.getAllOrders
    );
    this.router.get(
      `${this.path}/:customerId`, 
      this.getCustomerOrders
    );
    this.router.post(
        `${this.path}/callback/:orderId`, 
        this.callback);

        this.router.put(
          `${this.path}/:order`,
          this.updateDriver
        );

  }

  private updateDriver = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const orderId = req.params.order
    const {driverId, driverName,transportNumber} = req.body
     console.log(`from callback ${orderId}`)
   
    
        // console.log("received callback")
        // if(!callbackData.Body.stkCallback.CallbackMetadata ) {
        //     console.log(callbackData.Body)
        //     res.json("ok")

        // } else {

// update the order payment status to paid
const updatedOrder = await this.order.updateDriver(orderId, driverId, driverName, transportNumber);
res.json(updatedOrder)
// Calculate the total amount payable for each seller
// // retrieve the order by id
// const order = await this.order.retrieveById(orderId);
// const items = order?.products;
// const sellerTotals: { [key: string]: number } = {};

// Calculate the total amount payable for each seller
// if (items) {
//   // Calculate the total amount payable for each seller
//   for (const product of items) {
//     const { businessId, cartQuantity, price } = product;
//     const subtotal = cartQuantity*price;
//     if (sellerTotals[businessId]) {
//       sellerTotals[businessId] += subtotal;
//     } else {
//       sellerTotals[businessId] = subtotal;
//     }
//   }
// }

// console.log(sellerTotals)
// //get individual sellers/business serving the order and there amount payable to them from the products array
// // update each business earnings/account with the amount,
// //get delvery fee fraction from the totalAmount paid

//         }
       
          // res.json("ok")
      // Set order status to paid if the payment was successful
      // this.order.update()
    
  }

  private callback = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const callbackData = req.body;
    const orderId = req.params.orderId
     console.log(`from callback ${orderId}`)
   
    
        // console.log("received callback")
        if(!callbackData.Body.stkCallback.CallbackMetadata ) {
            console.log(callbackData.Body)
            res.json("ok")

        } else {

// update the order payment status to paid
await this.order.updatePaymentStatusToPaid(orderId)


// Calculate the total amount payable for each seller
// retrieve the order by id
const order = await this.order.retrieveById(orderId);
const items = order?.products;
const sellerTotals: { [key: string]: number } = {};

// Calculate the total amount payable for each seller
if (items) {
  // Calculate the total amount payable for each seller
  for (const product of items) {
    const { businessId, cartQuantity, price } = product;
    const subtotal = cartQuantity*price;
    if (sellerTotals[businessId]) {
      sellerTotals[businessId] += subtotal;
    } else {
      sellerTotals[businessId] = subtotal;
    }
  }
}

console.log(sellerTotals)
//get individual sellers/business serving the order and there amount payable to them from the products array
// update each business earnings/account with the amount,
//get delvery fee fraction from the totalAmount paid
// Update the account for each business using Axios
for (const businessId in sellerTotals) {
  const amount = sellerTotals[businessId];

  try {
    await axios.put(`http://localhost:5003/api/business/${businessId}`, { amount });
    console.log(`Account updated for business ${businessId}`);
  } catch (error) {
    console.error(`Error updating account for business ${businessId}:`, error);
  }
}

        }
       
          res.json("ok")
      // Set order status to paid if the payment was successful
      // this.order.update()
    
  }

  private createOrderMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      await this.createToken();
      next();
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { phoneNumber, customerId, products, totalAmount, shippingAddress } = req.body;
      // const orderPayload = {
      //   products,
      //   customerId,
      //   totalAmount,
      //   shippingAddress,
      // };

      // const metadata = JSON.stringify(orderPayload);

     
      
      
     
      const order = await this.order.create(
        customerId,
        products,
        totalAmount,
        shippingAddress,
        
      );
      const orderId = order._id
      await this.stkPush(phoneNumber, totalAmount,orderId);
      //console.log(order);
      return res.json(orderId);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
  private  getCustomerOrders =  async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response |void> =>{
    try {
    const {customerId} = req.params
        const orders = await this.order.retrieveByCustomerId(customerId)
      
         res.json( orders) 
    } catch(error: any) {
        next(new HttpException(400, error.message))
    }

}
  private  getAllOrders =  async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response |void> =>{
    try {
    
        const orders = await this.order.retrieve()
      
         res.json( orders) 
    } catch(error: any) {
        next(new HttpException(400, error.message))
    }

}
  private stkPush = async (phoneNumber: string, amount: string, orderId: string) => {

    console.log(amount)
    const shortCode = 174379;
    const phone = phoneNumber.substring(1);
    const passkey = 'bfb279fbdbcf1...';
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      ('0' + (date.getDate() + 1)).slice(-2) +
      ('0' + (date.getHours() + 1)).slice(-2) +
      ('0' + (date.getMinutes() + 1)).slice(-2) +
      ('0' + (date.getSeconds() + 1)).slice(-2);


    
    const data = {
      BusinessShortCode: shortCode,
      Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
    //   Timestamp: timestamp,
    Timestamp:"20160216165627",
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: `254${phone}`,
      PartyB: 174379,
      PhoneNumber: `254${phone}`,
      CallBackURL: `https://21f2-196-207-155-88.ngrok-free.app/api/order/callback/${orderId}`,
      AccountReference: orderId,
      TransactionDesc: 'Test',
    };

    try {

        console.log(`The access token is ${this.token}`)
      //  console.log(metadata)
      await axios.post(url, data, {
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      }).then((data)=>{
        console.log(data.data);
        
      });
      
    } catch (err) {
      console.log('STK Push error:', err);
    }
  };

  private createToken = async () => {
    const consumer_secret = 'D0TIl8PgIoWEGL2q';
    const consumer_key = '0nkgYTNAn0R6f7nM2x9cNGQjDvQb4b16';

    try {
        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate',{
                params: {
                    grant_type: "client_credentials"
                  },
            
              headers: {
                Authorization: `Basic ${Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64')}`,
              },
            
        });
          if (response.status === 200 && response.data && response.data.access_token) {
             this.token = response.data.access_token;
            console.log(`the access token${this.token}`); // Display the access token
        
            // Proceed with your subsequent requests using the access token
          } else {
            console.log('Failed to obtain access token.');
          }
        } catch (error) {
          console.error('An error occurred while generating the access token:', error);
        }
  };


}

export default OrderController;
