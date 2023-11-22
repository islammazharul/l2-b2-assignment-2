import { Request, Response } from "express";
import { userServices } from "../services/user.service";


const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const result = await userServices.createUser(userData)
        res.status(200).json({
            success: true,
            message: "User created successfully!",
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

export const userController = {
    createUser,
}