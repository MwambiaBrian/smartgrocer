import businessModel from "./business.model";
import Business from "./business.interface";

class BusinessService {
    private business = businessModel

    /**create a Business */

    public async create(name: string, businessEmail: string,businessPhoneNumber: string, businessType: string, ownerId: number,  location: any) {
        try {
            console.log(name)
            const business = await this.business.create({name, businessEmail, businessPhoneNumber, businessType, ownerId,  location});
            return business;
        } catch(error) {
            console.log(error)
            throw new Error('unable to create business')
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
      
            const business = await this.business.findOne({ownerId:id});
            if(business){
                return business;
            }
          
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
       /**update earnings*/ 

       public async updateEarnings(id: string, amount: number) {
        try {
            const business= await this.business.findById(id)
            if(business) {
                const currentEarnings = Number(business.earnings);
                const updatedEarnings = currentEarnings + Number(amount);
                business.earnings = updatedEarnings;

        await business.save(); // Save the updated business entity
               // const updateEarnings = {...business,earnings:business.earnings+amount}
              // await this.business.updateOne(id,updateEarnings)
                //console.log(business.earnings)
              //  const updatedBusiness = await this.business.findById(id)
                return business.earnings
            }
        } catch (error) {
            
        }
       }
       public async getEarnings(id: string,) {
        try {
            const business= await this.business.findById(id)
            if(business) {
             

      // Save the updated business entity
               // const updateEarnings = {...business,earnings:business.earnings+amount}
              // await this.business.updateOne(id,updateEarnings)
                //console.log(business.earnings)
              //  const updatedBusiness = await this.business.findById(id)
                return business.earnings
            }
        } catch (error) {
            
        }
       }
}


export default BusinessService;