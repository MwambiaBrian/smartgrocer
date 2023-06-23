import {Schema, model } from 'mongoose';
import Business from './business.interface'

const BusinessSchema = new Schema({

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

export default model<Business>('business', BusinessSchema)