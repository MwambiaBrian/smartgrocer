import {Schema, model } from 'mongoose';
import Product from './product.interface'

const ProductSchema = new Schema({
    businessId: {type: String, required: true},

    name: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true

    },
    img: { type: String, required: true },
    price: {
        type: Number,
        required: true

    },
    desc: {
        type: String ,
        required: true

    }


}

    // {timestamp: true}
)

export default model<Product>('post', ProductSchema)