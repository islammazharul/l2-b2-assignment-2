import { Request, Response } from "express";
import { userServices } from "./user.service";
import userSchema from "./user.validation";



const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        // console.log(userData);
        // data validation using zod package
        const parseDataByZod = userSchema.parse(userData)
        const result = await userServices.createUser(parseDataByZod)
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

export const userController = {
    createUser,
}