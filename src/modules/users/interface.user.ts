import { Model } from "mongoose";

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};
export type TUser = {
  userId: number;
  userName: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TOrder[];
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number | string): Promise<TUser | null>;
}
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  addProductToOrders(
    id: number | string,
    orderData: { productName: string; price: number; quantity: number }
  ): Promise<TUser | null>;
}
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  getUserOrders(id: number | string): Promise<TUser | null>;
}
