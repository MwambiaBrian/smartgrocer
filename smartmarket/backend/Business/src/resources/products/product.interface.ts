import {Document} from 'mongoose'

export default interface Product extends Document {
    name: string;
    category: string,
    img: object,
    price: number
    desc: string
}