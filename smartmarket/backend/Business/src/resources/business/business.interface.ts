import {Document} from 'mongoose'

export default interface Business extends Document {
    name: string;
    ownerId: string,
    businessEmail: string,
    businessType: string,
    businessPhoneNumber: string,

    location: {
        county: string;
        city: string;
        street: string;
     building: string;
       
      };
      earnings: number;
 
}