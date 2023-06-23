import {Schema, model } from 'mongoose';
import Delivery from './delivery.interface'

const DeliverySchema = new Schema({

    items: {
        type: String,
        required: true

    },
    buyerAddress: {
        type: String,
        required: true

    },
    sellerAddress: {
        type: String,
        required: true

    }
}

    // {timestamp: true}
)

export default model<Delivery>('delivery', DeliverySchema)