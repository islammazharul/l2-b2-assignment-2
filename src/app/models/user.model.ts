import { Schema, model } from "mongoose";
import { TUser, TUserAddress, TUserName, TOrderProduct } from "../interfaces/user.interface";


const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        // required: [true, "First name must be required"],
    },
    lastName: {
        type: String,
        // required: [true, "Last name must be required"],
    }
})

const userAddressSchema = new Schema<TUserAddress>({
    street: {
        type: String,
        // required: [true, "street must be required"],
    },
    city: {
        type: String,
        // required: [true, "city must be required"],
    },
    country: {
        type: String,
        // required: [true, "country must be required"],
    }
})

const orderSchema = new Schema<TOrderProduct>({
    productName: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    }
})

const userSchema = new Schema<TUser>({
    userId: {
        type: Number,
        // required: [true, "User ID must be required"],
        // unique: true
    },
    username: {
        type: String,
        // required: [true, "User name must be required"],
        // unique: true
    },
    password: {
        type: String,
        // required: [true, "User password must be required"],
    },
    fullName: userNameSchema,
    age: {
        type: Number,
        // required: [true, "User age must be required"],
    },
    email: {
        type: String,
        // required: [true, "User email must be required"],
    },
    isActive: {
        type: Boolean,
        default: true
    },
    hobbies: [String],
    address: userAddressSchema,
    orders: [orderSchema]
})

const User = model<TUser>("User", userSchema)

export default User;