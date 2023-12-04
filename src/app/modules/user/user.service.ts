import User from '../user.model';
import { TOrderProduct, TUser } from './user.interface';

const createUserIntoDb = async (userData: TUser) => {
    // instance method
    const user = new User(userData); /* create an instance */
    if (await user.isUserExist(userData.userId)) {
        throw new Error('User already exists!');
    }
    const result = user.save();
    return result;
};

const getAllUserFromDb = async () => {
    const result = await User.aggregate([
        {
            $project: {
                username: 1,
                fullName: 1,
                age: 1,
                email: 1,
                address: 1,
            },
        },
    ]);
    return result;
};

const getSingleUserFromDb = async (id: number) => {
    const userID = id;
    const user = new User({ userId: id });
    const doesExist = await user.isUserExist(userID);
    if (!doesExist) {
        throw new Error('User does not exist!');
    } else {
        const result = await User.aggregate([
            { $match: { userId: id } },
            {
                $project: {
                    userId: 1,
                    username: 1,
                    fullName: 1,
                    age: 1,
                    email: 1,
                    isActive: 1,
                    hobbies: 1,
                    address: 1,
                },
            },
        ]);
        return result;
    }
};

const updateUserInDb = async (
    id: number,
    updateData: TUser,
): Promise<TUser | null> => {
    const userID = id;
    const user = new User({ userId: id });
    const doesExist = await user.isUserExist(userID);
    if (!doesExist) {
        throw new Error('User does not exist!');
    } else {
        const result = await User.findOneAndUpdate({ userId: id }, updateData, {
            new: true,
            runValidators: true,
        });
        return result;
    }
};

const deleteUserFromDb = async (id: number) => {
    const user = new User({ userId: id });
    const userID = id;

    const doesExist = await user.isUserExist(userID);
    if (!doesExist) {
        throw new Error('User does not exist!');
    } else {
        const result = await User.findOneAndDelete({ userId: id });
        return result;
    }
};

const addOrderCollectionInDb = async (
    id: number,
    orderProduct: TOrderProduct,
) => {
    const userID = id;
    const user = new User({ userId: id });

    const doesExist = await user.isUserExist(userID)
    if (!doesExist) {
        throw new Error('User does not exist!');
    } else {
        const result = await User.findOneAndUpdate(
            { userId: id },
            { $push: { orders: orderProduct } },
            { new: true, upsert: true }
        );
        return result;
    }
};

const singleUserOrderDb = async (id: number) => {
    const userID = id;
    const user = new User({ userId: id });
    const doesExist = await user.isUserExist(userID);
    if (!doesExist) {
        throw new Error('User does not exist!');
    } else {
        const result = await User.aggregate([
            { $match: { userId: id } },
            {
                $project: {
                    orders: 1,
                },
            },
        ]);
        return result;
    }
};

const totalPriceOfOrder = async (id: number) => {
    const userID = id;
    const user = new User({ userId: id });
    const doesExist = await user.isUserExist(userID);
    if (doesExist) {
        const result = await User.aggregate([
            { $match: { userId: id } },
            {
                $unwind: '$orders',
            },
            {
                $group: {
                    _id: '$userId',
                    totalPrice: {
                        $sum: {
                            $multiply: ['$orders.price', '$orders.quantity'],
                        },
                    },
                },
            },
            {
                $project: {
                    totalPrice: { $round: ['$totalPrice', 2] },
                },
            },
        ]);
        if (result.length > 0) {
            const response = {
                success: true,
                message: 'Total price calculated successfully!',
                data: {
                    totalPrice: result[0].totalPrice,
                },
            };
            return response;
        } else {
            const errorResponse = {
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            };
            return errorResponse;
        }
    }
};

export const userServices = {
    createUserIntoDb,
    getAllUserFromDb,
    getSingleUserFromDb,
    updateUserInDb,
    deleteUserFromDb,
    addOrderCollectionInDb,
    singleUserOrderDb,
    totalPriceOfOrder,
};
