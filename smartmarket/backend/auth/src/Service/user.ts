

 import User, { Iuser } from "../models/user"





 
 class UserService {
     private user = User
 
     /**create a User */
 
     public async create(name: string, email: string, password: string) {
         try {
             //console.log(name)
             const user = await this.user.create({name, email, password,});
             return user;
         } catch(error) {
             console.log(error)
             throw new Error('unable to create user')
         }
     }
 
        /**retrieve all users */
 
        public async retrieve() {
         try {
             const users = await this.user.find();
             return users;
         } catch (error) {
             console.log(error)
             throw new Error('unable to get users')
         }
     }
 
      /**retrieve a user */
 
      public async retrieveById(id: string) {
         try {
       
             const user = await this.user.find({ownerId:id});
             return user;
         } catch(error) {
             console.log(error)
             throw new Error('unable to retrieve business')
         }
     }

     public getUserByEmail= async (email: string) => {
        const user = await User.findOne({ email });
        console.log(user)
        return user;
    }
 
      /**delete a user */
 
      public async deleteById(id: string) {
         try {
       
             const user = await this.user.findByIdAndDelete(id);
             return user;
         } catch(error) {
             console.log(error)
             throw new Error('unable to delete business')
         }
     }
       
 }
 
 
 export default UserService;




