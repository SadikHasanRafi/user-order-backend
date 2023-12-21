import { Model } from "mongoose";

export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Orders {
  productName: string;
  price: number;
  quantity: number;
}

export interface User {
  userId: number; //unique
  username: string; //unique
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string; //unique
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders: Orders[];
}

export interface UserMethods {
  isUserExists(userId: number): Promise<User | null>;
  isProductExists(userId: number, orders: Orders): Promise<Orders | null>;
}

export type UserModel = Model<User, object, UserMethods>;
