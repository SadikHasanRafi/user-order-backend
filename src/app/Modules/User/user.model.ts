import { Schema, model } from "mongoose";
import {
  Address,
  Orders,
  User,
  UserMethods,
  UserModel,
} from "./user.interface";

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

const userSchema = new Schema<User, UserModel, UserMethods>({
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

userSchema.method("isUserExists", async function isUserExists(userId: number) {
  const existingUser = await UserModel.findOne({ userId: userId });
  if (existingUser) {
    return true;
  } else {
    return false;
  }
});

userSchema.method(
  "isProductExists",
  async function isProductExists(userId: number, orders: Orders) {
    // const existingUser = await UserModel.findOne({ userId })
    const existingProduct: User | null = await UserModel.findOne({
      userId: userId,
    });

    if (
      existingProduct &&
      existingProduct.orders.map((x: Orders) => {
        if (x.productName === orders.productName) {
          return true;
        }
      })
    ) {
      return true;
    } else {
      return false;
    }
  },
);

userSchema.pre("find", function (next) {
  this.find().projection({
    username: 1,
    _id: 0,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  next();
});

const UserModel = model<User, UserModel>("User", userSchema);

export default UserModel;
