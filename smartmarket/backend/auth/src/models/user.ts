import mongoose from "mongoose"
import bcrypt from "bcrypt"
//import UserRoles from "../roles/roles.js"

export interface Iuser {
  id?: number;
  name: string;
  email: string;
  password: string;
 
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
      },
      
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
   // role: { type: String, required: false, enum: Object.values(UserRoles) },
    // payment: {
    //     type: {
    //       method: { type: String, enum: ['credit_card', 'paypal'], required: true },
    //       account: { type: String, required: true },
    //       expiration: { type: Date, required: true },
    //       cvv: { type: String, required: true },
    //     },
    //     required: false,
    //   },
    //   delivery: {
    //     type: {
    //       address: { type: String, required: true },
    //       city: { type: String, required: true },
    //       state: { type: String, required: true },
    //       zip: { type: String, required: true },
    //       country: { type: String, required: true },
    //     },
    //     required: false,
    //   },
  });

  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (err: any) {
      next(err);
    }
  });
  
  userSchema.methods.comparePassword = async function (password: string) {
    try {
      const isMatch = await bcrypt.compare(password, this.password);
      return isMatch;
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const User = mongoose.model('User', userSchema);
   export default User