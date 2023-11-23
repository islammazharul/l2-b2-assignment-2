import User from "../user.model";
import { TUser } from "./user.interface";



const createUserIntoDb = async (userData: TUser) => {

    // instance method
    const user = new User(userData)/* create an instance */
    if (await user.isUserExist(userData.userId)) {
        throw new Error("User already exists!")
    }
    const result = user.save() /* built in instance method */
    return result
}

const getAllUserFromDb = async () => {
    const result = await User.find()
    return result
}




export const userServices = {
    createUserIntoDb,
    getAllUserFromDb,
}