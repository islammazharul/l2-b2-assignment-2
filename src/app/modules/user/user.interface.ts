import { Model } from "mongoose";

type TUserName = {
    firstName: string;
    lastName: string;
}

type TUserAddress = {
    street: string;
    city: string;
    country: string
}

type TOrderProduct = {
    productName: string;
    price: number;
    quantity: number
}

type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TUserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TUserAddress;
    orders: TOrderProduct[]
}

// creating method for existing user
export type UserMethods = {
    // eslint-disable-next-line no-unused-vars
    isUserExist(userId: number): Promise<TUser | null>
}

type UserModel = Model<TUser, Record<string, never>, UserMethods>;

export { TUser, TUserName, TUserAddress, TOrderProduct, UserModel }