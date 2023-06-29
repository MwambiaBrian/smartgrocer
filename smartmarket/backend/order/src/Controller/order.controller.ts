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
    this.router.post(
        `${this.path}/callback`, 
        this.callback);
  }

  private callback = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const callbackData = req.body;
    
    
        // console.log("received callback")
        if(!callbackData.Body.stkCallback.CallbackMetadata ) {
            console.log(callbackData.Body)
            res.json("ok")

        }
        console.log(callbackData)
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
      const { phoneNumber, products, buyerId, subtotal, totalamount, shipping } = req.body;
      const orderPayload = {
        products,
        buyerId,
        subtotal,
        totalamount,
        shipping,
      };

      const metadata = JSON.stringify(orderPayload);

      console.log(`from endpoint ${totalamount}`)
      await this.stkPush(phoneNumber, totalamount,metadata);
      
    //   const payment_status = 'processing';
    //   const order = await this.order.create(
    //     products,
    //     buyerId,
    //     subtotal,
    //     totalamount,
    //     shipping,
    //     payment_status
    //   );
      //console.log(order);
      return res.json({  });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private stkPush = async (phoneNumber: string, amount: string, metadata: any) => {

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
      CallBackURL: "https://7d9c-102-219-210-201.ngrok-free.app/api/order/callback",
      AccountReference: 'Test',
      TransactionDesc: 'Test',
    metadata: metadata,
    };

    try {

        console.log(`The access token is ${this.token}`)
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
