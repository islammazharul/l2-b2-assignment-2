import { TUser } from "../interfaces/user.interface";
import User from "../models/user.model";


const createUser = async (userData: TUser): Promise<TUser> => {
    const result = await User.create(userData)
    return result
}




export const userServices = {
    createUser,
}