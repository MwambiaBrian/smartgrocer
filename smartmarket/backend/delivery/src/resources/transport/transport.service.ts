import transportModel from "./transport.model";
import Transport from "./transport.interface";

class TransportService {
    private transport = transportModel

    /**create a transport */

    public async create( transportEmail: string, transportNumber: string, ownerId: number,  transportType: string, transportMobileNumber: string) {
        try {
            
            const transport = await this.transport.create({transportEmail, transportNumber, ownerId,  transportType, transportMobileNumber});
            return transport;
        } catch(error) {
            console.log(error)
            throw new Error('unable to create transport')
        }
    }

       /**retrieve all transports */

       public async retrieve() {
        try {
            const transports = await this.transport.find();
            return transports;
        } catch (error) {
            console.log(error)
            throw new Error('unable to get transport')
        }
    }

     /**retrieve a transport */

     public async retrieveById(id: string) {
        try {
      
            const transport = await this.transport.find({ownerId:id});
            return transport;
        } catch(error) {
            console.log(error)
            throw new Error('unable to retrieve transport')
        }
    }

     /**delete a transport */

     public async deleteById(id: string) {
        try {
      
            const transport = await this.transport.findByIdAndDelete(id);
            return transport;
        } catch(error) {
            console.log(error)
            throw new Error('unable to delete transport')
        }
    }
      
}


export default TransportService;