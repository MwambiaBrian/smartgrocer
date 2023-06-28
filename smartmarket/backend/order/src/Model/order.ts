import {Document} from 'mongoose'
import {Schema, model } from 'mongoose';

export  interface Order extends Document {
    userId: string;
    products: [
        {
            id: String,
              name: String,
              businessId: String,
              category: string,
              price: Number,
              desc: String,
              image: String,
              cartQuantity: String
        }
    ],
    subtotal: String,
    totalAmount: string,
    shipping: Object,
    payment_status: string

}



const OrderSchema = new Schema({

    userId: {
        type: String,
        required: true

    },
    products: [
        {
            id:{type: String},
              name:{type: String},
              businessId:{type: String},
              price:{type: Number},
              desc: {type: String},
              image: {type: String},
              cartQuantity: {type: String}
        }
    ],
    subtotal: {
        type: Number,
        required: true

    },
 
    totalAmount: {
        type: Number,
        required: true

    },

    shipping: {
        type: Object,
        required: true

    },
 
 
    delivery_status: {
        type: String ,
        required: false,
        default: "pending"

    },
    payment_status: {
        type: String ,
        required: true,
        

    },
//   {timestamp: true}

}

   // {timestamp: true}
)

export default model<Order>('order', OrderSchema)