import mongoose, { Schema } from 'mongoose';
import { Address, Orders, User } from './user.interface';


const addressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const orderSchema = new Schema<Orders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<User>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  fullName: {
    firstName: { type: String },
    lastName: { type: String },
  },
  age: { type: Number },
  email: { type: String, unique: true },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: { type: addressSchema },
  orders: { type: [orderSchema] },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
