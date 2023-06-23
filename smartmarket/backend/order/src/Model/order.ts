import {Document} from 'mongoose'
import {Schema, model } from 'mongoose';

export  interface Order extends Document {
    name: string;
    ownerId: string,
    businessEmail: string,
    desc: string
}



const OrderSchema = new Schema({

    name: {
        type: String,
        required: true

    },
    businessEmail: {
        type: String,
        required: true

    },
    ownerId: {
        type: String,
        required: true

    },
 
    desc: {
        type: String ,
        required: true

    }


}

    // {timestamp: true}
)

export default model<Order>('business', OrderSchema)