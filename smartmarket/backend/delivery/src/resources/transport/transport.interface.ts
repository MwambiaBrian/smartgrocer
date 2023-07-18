import {Document} from 'mongoose'

export default interface Transport extends Document {
    transportNumber: string;
    ownerId: string,
    transportEmail: string,
    transportMobileNumber: string,
    transportType: string
    stage: {
        county: string;
        town: string;
        street: string;
      };
}