import User from "../user.model";
import { TUser } from "./user.interface";



const createUser = async (userData: TUser): Promise<TUser> => {
    const result = await User.create(userData)
    return result
}




export const userServices = {
    createUser,
}