import {Document} from 'mongoose'

export default interface Business extends Document {
    name: string;
    ownerId: string,
    businessEmail: string,
    desc: string
}