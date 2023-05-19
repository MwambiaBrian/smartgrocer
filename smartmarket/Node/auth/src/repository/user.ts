
// import Seller from "../models/seller.js"
// import Customer from "../models/customer.js"
// import Rider from "../models/rider.js"
 import User, { Iuser } from "../models/user"


 export const createUser = async (newuser: Iuser) => {

    
  
         const name = newuser.name
          const email = newuser.email
         const password= newuser.password;
        
        

          const user = new User({ name, email, password});
           await user.save();
          return user;
          
   
    
}
export const getUserByname= async (email: string) => {
    const user = await User.findOne({ email });
    console.log(user)
    return user;
}