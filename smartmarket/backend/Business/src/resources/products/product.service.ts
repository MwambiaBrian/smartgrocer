import productModel from "./product.model";
import Product from "./product.interface";

class ProductService {
    private product = productModel

    /**create a product */

    public async create(name: string, category: string, price: number, img: string, desc: string) {
        try {
            console.log(name)
            const product = await this.product.create({name, category, price, img, desc});
            return product;
        } catch(error) {
            console.log(error)
            throw new Error('unable to create product')
        }
    }

     /**retrieve all products */

    public async retrieve() {
        try {
            const products = await this.product.find();
            return products;
        } catch (error) {
            console.log(error)
            throw new Error('unable to get products')
        }
    }

         /**retrieve a product */

         public async retrieveById(id: string) {
            try {
          
                const product = await this.product.findById(id);
                return product;
            } catch(error) {
                console.log(error)
                throw new Error('unable to retrieve product')
            }
        }

             /**delete a product */

             public async deleteById(id: string) {
                try {
              
                    const product = await this.product.findByIdAndDelete(id);
                    return product;
                } catch(error) {
                    console.log(error)
                    throw new Error('unable to delete product')
                }
            }
}


export default ProductService;