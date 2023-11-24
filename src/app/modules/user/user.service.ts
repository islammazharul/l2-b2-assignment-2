import User from "../user.model";
import { TUser } from "./user.interface";



const createUserIntoDb = async (userData: TUser) => {

    // instance method
    const user = new User(userData)/* create an instance */
    if (await user.isUserExist(userData.userId)) {
        throw new Error("User already exists!")
    }
    const result = user.save()
    return result
}

const getAllUserFromDb = async () => {
    const result = await User.aggregate([
        {
            $project: {
                username: 1, fullName: 1, age: 1, email: 1, address: 1
            }
        }
    ])
    return result
}

const getSingleUserFromDb = async (id: number): Promise<TUser | null> => {
    const result = await User.findOne({ userId: id }).select("-password").exec()
    if (!result) {
        throw new Error("User does not exist!")
    }

    return result
}

const updateUserInDb = async (id: number, updateData: TUser): Promise<TUser | null> => {
    const result = await User.findOneAndUpdate({ userId: id }, updateData, {
        new: true,
        runValidators: true
    })
    return result
}

const deleteUserFromDb = async (id: number): Promise<TUser | null> => {
    const result = await User.findOneAndDelete({ userId: id })
    return result
}

const addOrderCollectionInDb = async (id: number, userData: TUser) => {
    const result = await User.findOneAndUpdate(
        { $match: { userId: id } },
        { $push: { "$user.orders": userData } }
    )
    return result
}

// const addOrderCollectionInDb = async (
//     id: number,
//     productName: string,
//     price: number,
//     quantity: number,
//     userData: TUser
// ): Promise<TUser | null> => {
//     const result = await User.findOneAndUpdate(
//         { userId: id },
//         {
//             $set: {
//                 orders: {
//                     $cond: {
//                         if: { $isArray: "$orders" },
//                         then: {
//                             $concatArrays: [
//                                 "$orders",
//                                 [{
//                                     productName, price, quantity
//                                 }]
//                             ]
//                         },
//                         else: [{
//                             productName, price, quantity
//                         }]
//                     }
//                 }
//             }
//         },
//         {
//             new: true, // Return the modified document
//             runValidators: true // Run validators on update
//         }
//     );

//     return result;
// };

const totalPriceOfOrder = async (id: number) => {
    const result = await User.aggregate([
        { $match: { userId: id } },
        {
            $unwind: "$orders"
        },
        {
            $group: {
                _id: "$userId",
                totalPrice:
                {
                    $sum:
                    {
                        $multiply: ["$orders.price", "$orders.quantity"]
                    }
                }
            }
        },
        {
            $project: {
                totalPrice: { $round: ["$totalPrice", 2] }
            }
        }
    ])
    return result
}


export const userServices = {
    createUserIntoDb,
    getAllUserFromDb,
    getSingleUserFromDb,
    updateUserInDb,
    deleteUserFromDb,
    addOrderCollectionInDb,
    totalPriceOfOrder
}