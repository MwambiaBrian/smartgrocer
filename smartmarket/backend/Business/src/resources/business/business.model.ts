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
     payment: {
        type: {
          method: { type: String, enum: ['mpesa'], required: true },
          account: { type: String, required: true },
       
        },
        required: false,
      },

         delivery: {
        type: {
          address: { type: String, required: true },
          subCounty: { type: String, required: true },
          market: { type: String, required: true },
          zip: { type: String, required: true },
          county: { type: String, required: true },
        },
        required: false,
      },
 
    desc: {
        type: String ,
        required: true

    }


}

    // {timestamp: true}
)

export default model<Business>('business', BusinessSchema)