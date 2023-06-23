import deliveryModel from "./delivery.model";
import Transport from "./delivery.interface";

class DeliveryService {
    private delivery = deliveryModel

    /**create a Delivery */

    public async create(items: string, sellerAddress: string, buyerAddress: string) {
        try {
            console.log(name)
            const delivery = await this.delivery.create({items, sellerAddress, buyerAddress});
            return delivery;
        } catch(error) {
            console.log(error)
            throw new Error('unable to create delivery')
        }
    }

       /**retrieve all Deliveries */

       public async retrieve() {
        try {
            const deliverys = await this.delivery.find();
            return deliverys;
        } catch (error) {
            console.log(error)
            throw new Error('unable to get deliveries')
        }
    }

     /**retrieve a Delivery */

     public async retrieveById(id: string) {
        try {
      
            const delivery = await this.delivery.find({ownerId:id});
            return delivery;
        } catch(error) {
            console.log(error)
            throw new Error('unable to retrieve delivery')
        }
    }

     /**delete a Delivery */

     public async deleteById(id: string) {
        try {
      
            const delivery = await this.delivery.findByIdAndDelete(id);
            return delivery;
        } catch(error) {
            console.log(error)
            throw new Error('unable to delete delivery')
        }
    }
      
}


export default DeliveryService;