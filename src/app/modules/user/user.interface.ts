import { Model } from "mongoose";

interface TUserName {
    firstName: string;
    lastName: string;
    // _id: boolean
}

interface TUserAddress {
    street: string;
    city: string;
    country: string
    // _id: boolean
}

interface TOrderProduct {
    productName: string;
    price: number;
    quantity: number;
    // _id: boolean
}

interface TUser {
    userId: number;
    username: string;
    password: string;
    fullName: TUserName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TUserAddress;
    orders?: TOrderProduct[] | undefined;
}

// creating method for existing user
export type UserMethods = {
    // eslint-disable-next-line no-unused-vars
    isUserExist(userId: number): Promise<TUser | null>
}

type UserModel = Model<TUser, Record<string, never>, UserMethods>;

export { TUser, TUserName, TUserAddress, TOrderProduct, UserModel }