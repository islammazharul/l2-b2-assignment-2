import { Request, Response } from "express";
import { userServices } from "./user.service";
import userSchema from "./user.validation";
import { number } from "zod";



const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        // console.log(userData);
        // data validation using zod package
        const parseDataByZod = userSchema.parse(userData)
        const result = await userServices.createUserIntoDb(parseDataByZod)
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // console.log(error);
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong!",
            data: error
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUserFromDb()
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong!",
            data: error
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await userServices.getSingleUserFromDb(userId)
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong!",
            data: error
        })
    }
}

export const userController = {
    createUser,
    getAllUser,
    getSingleUser
}