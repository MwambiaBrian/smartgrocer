import orderModel from "../Model/order";
import {Order} from "../Model/order";

class OrderService {
    private ordermodel = orderModel

    /**create a order */

   

    
      
    
      public async create(
        customerId: string,
        products: Array<any>,
        totalAmount: number,
        shippingAddress: {
          street: string;
          city: string;
          state: string;
          county: string;
          
        }
      ): Promise<Order> {
        try {
          const order: Order = await this.ordermodel.create({
            customerId,
            products,
            totalAmount,
            shippingAddress,
            deliveryStatus: 'Pending',
            paymentStatus: 'processing',
            createdAt: new Date(),
          });
    
          return order;
        } catch (error) {
          console.error(error);
          throw new Error('Unable to create order');
        }
      }
    
      // ...
    
    
     /**retrieve all orders */

    public async retrieve() {
        try {
            const orders = await this.ordermodel.find();
            return orders;
        } catch (error) {
            console.log(error)
            throw new Error('unable to get orders')
        }
    }

         /**retrieve a product */

         public async retrieveById(id: string) {
            try {
          
                const order = await this.ordermodel.findById(id);
                return order;
            } catch(error) {
                console.log(error)
                throw new Error('unable to retrieve order')
            }
        }
/**retrieve a product */

public async retrieveByCustomerId(customerId: string) {
  try {

      const orders = await this.ordermodel.find({customerId});
      return orders;
  } catch(error) {
      console.log(error)
      throw new Error('unable to retrieve order')
  }
}

             /**delete a product */

             public async deleteById(id: string) {
                try {
              
                    const order = await this.ordermodel.findByIdAndDelete(id);
                    return order;
                } catch(error) {
                    console.log(error)
                    throw new Error('unable to delete order')
                }
            }
/**update payment service */
            public async updatePaymentStatusToPaid(id: string) {
              try {
                const order = await this.ordermodel.findById(id);
                
                if (!order) {
                  throw new Error('Order not found');
                }
            
                order.paymentStatus = 'paid';
                await order.save();
            
                return order;
              } catch (error) {
                console.log(error);
                throw new Error('Unable to update order payment status');
              }
            }

            /**update driver Id */
            public async updateDriver(id: string, driverId:string, driverNumber: string, driverName: string) {
              try {
                const order = await this.ordermodel.findById(id);
                
                if (!order) {
                  throw new Error('Order not found');
                }
            
                order.driverId = driverId;
                order.transportNumber=driverNumber;
                order.driverName = driverName;
                await order.save();
            
                return order;
              } catch (error) {
                console.log(error);
                throw new Error('Unable to update order payment status');
              }
            }
            
}


export default OrderService;