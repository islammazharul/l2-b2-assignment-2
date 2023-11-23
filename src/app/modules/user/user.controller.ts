import { Request, Response } from "express";
import { userServices } from "./user.service";



const createUser = async (req: Request, res: Response) => {
    try {
        const { user: userData } = req.body;
        // console.log(userData);
        const result = await userServices.createUser(userData)
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