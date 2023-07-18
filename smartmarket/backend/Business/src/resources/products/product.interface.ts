import {Document} from 'mongoose'

export default interface Product extends Document {
    businessId: string;
    name: string;
    category: string,
    img: object,
    price: number
    desc: string
}