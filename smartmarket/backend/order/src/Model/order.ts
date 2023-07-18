import mongoose, {Document} from 'mongoose'
import {Schema, model } from 'mongoose';

export interface Order extends Document {
    customerId: string;
    driverId: string;
    transportNumber: string;
    driverName: string;
    products: Array<{
     // productId: string;
      businessId:string;
      cartQuantity: number;
      price: number;
      // subtotal: number;

    }>;
    totalAmount: number;
    shippingAddress: {
      street: string;
      city: string;
      building: string;
      county: string;
      
    };
    deliveryStatus: string;
    
    paymentStatus: string;
    // createdAt: Date;
  }
  



const OrderSchema = new Schema({

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
      },

    driverId: {
      type: String,
     
      required: false,
    },
    transportNumber: {
      type: String,
     
      required: false,
    },
    driverName: {
      type: String,
     
      required: false,
    },
      products: [{
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        businessId: {
          type: String,
          ref: 'Business',
          required: true,
        },
        cartQuantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        // subtotal: {
        //   type: Number,
        //   required: true,
        // },
      }],
      totalAmount: {
        type: Number,
        required: true,
      },
      shippingAddress: {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
     
        county: {
          type: String,
          required: true,
        },
        building: {
          type: String,
          required: false,
        },
      },
      deliveryStatus: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'Pending',
      },
      paymentStatus: {
        type: String,
        enum: ['Pending', 'processing', 'paid'],
        default: 'Pending',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
//   {timestamp: true}

}

   // {timestamp: true}
)

export default model<Order>('order', OrderSchema)