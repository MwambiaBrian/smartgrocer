import businessModel from "./business.model";
import Business from "./business.interface";

class BusinessService {
    private business = businessModel

    /**create a Business */

    public async create(name: string, businessEmail: string, ownerId: number,  desc: string) {
        try {
            console.log(name)
            const business = await this.business.create({name, businessEmail, ownerId,  desc});
            return business;
        } catch(error) {
            console.log(error)
            throw new Error('unable to create post')
        }
    }

       /**retrieve all businesses */

       public async retrieve() {
        try {
            const businesses = await this.business.find();
            return businesses;
        } catch (error) {
            console.log(error)
            throw new Error('unable to get businesses')
        }
    }

     /**retrieve a Business */

     public async retrieveById(id: string) {
        try {
      
            const business = await this.business.find({ownerId:id});
            return business;
        } catch(error) {
            console.log(error)
            throw new Error('unable to retrieve business')
        }
    }

     /**delete a business */

     public async deleteById(id: string) {
        try {
      
            const business = await this.business.findByIdAndDelete(id);
            return business;
        } catch(error) {
            console.log(error)
            throw new Error('unable to delete business')
        }
    }
      
}


export default BusinessService;