import {Schema, model } from 'mongoose';
import Transport from './transport.interface'

const TransportSchema = new Schema({

    transportMobileNumber: {
        type: String,
        required: true

    },

    transportEmail: {
        type: String,
        required: true

    },
    transportType: {
        type: String ,
        required: true

    },
    transportNumber: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: String,
        required: true

    },
    stage: {
        county: {
            type: String,
            required: true,
          },
          town: {
            type: String,
            required: true,
          },
        street: {
          type: String,
          required: true,
        },
      
      
    
     
      },
    active: {
        type: Boolean ,
        default: false

    }

 
}
// {timestamp: true}
    
)

export default model<Transport>('transport', TransportSchema)