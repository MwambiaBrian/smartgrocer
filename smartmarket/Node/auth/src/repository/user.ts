

 import User, { Iuser } from "../models/user"


 export const createUser = async (newuser: Iuser) => {

        const user = new User(newuser);
           await user.save();
          return user;
          
   
    
}
export const getUserByname= async (email: string) => {
    const user = await User.findOne({ email });
    console.log(user)
    return user;
}