import { Schema, model } from 'mongoose';
import Business from './business.interface';

const BusinessSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  businessEmail: {
    type: String,
    required: true,
  },
  businessPhoneNumber: {
    type: String,
    required: true,
  },
  businessType: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
   
    required: true,
  },
  earnings: {
    type: Number,
    default: 0,
  },
 
  location: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  
    county: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
  },
  // Add other relevant fields as needed
});

export default model<Business>('Business', BusinessSchema);
