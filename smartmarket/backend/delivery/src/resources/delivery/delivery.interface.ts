import {Document} from 'mongoose'

export default interface Delivery extends Document {
    items: string;
    buyerAddress: string,
    SellerAddress: string,

}