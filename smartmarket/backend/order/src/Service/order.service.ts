import orderModel from "../Model/order";
import {Order} from "../Model/order";

class OrderService {
    private order = orderModel

    /**create a order */

    public async create(items: string, buyer: string, totalAmount: number, sellers: string) {
        try {
            console.log(name)
            const order = await this.order.create({items, buyer, sellers, totalAmount}); 
            return order;
        } catch(error) {
            console.log(error)
            throw new Error('unable to create order')
        }
    }

     /**retrieve all orders */

    public async retrieve() {
        try {
            const orders = await this.order.find();
            return orders;
        } catch (error) {
            console.log(error)
            throw new Error('unable to get orders')
        }
    }

         /**retrieve a product */

         public async retrieveById(id: string) {
            try {
          
                const order = await this.order.findById(id);
                return order;
            } catch(error) {
                console.log(error)
                throw new Error('unable to retrieve order')
            }
        }

             /**delete a product */

             public async deleteById(id: string) {
                try {
              
                    const order = await this.order.findByIdAndDelete(id);
                    return order;
                } catch(error) {
                    console.log(error)
                    throw new Error('unable to delete order')
                }
            }
}


export default OrderService;