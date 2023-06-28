import orderModel from "../Model/order";
import {Order} from "../Model/order";

class OrderService {
    private order = orderModel

    /**create a order */

    public async create(products: [], buyerId: string,subtotal: number, totalAmount: number, shipping: object, payment_status: string,) {
        try {
            const order = await this.order.create({products, buyerId, subtotal,totalAmount, shipping, payment_status}); 
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