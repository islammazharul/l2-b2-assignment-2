import { Request, Response } from 'express';
import { userServices } from './user.service';
import userSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData  = req.body;
    // data validation using zod package
    const parseDataByZod = userSchema.parse(userData);
    const result = await userServices.createUserIntoDb(parseDataByZod);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await userServices.getSingleUserFromDb(id);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const id = parseInt(req.params.userId);
    const result = await userServices.updateUserInDb(id, updateData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    });
  }
};
const addOrderCollection = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const orderProduct = req.body;
    const result = await userServices.updateUserInDb(
      Number(userId),
      orderProduct,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    await userServices.deleteUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    });
  }
};

const singleUserOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const result = await userServices.singleUserOrderDb(id);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    });
  }
};

const totalPrice = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const result = await userServices.totalPriceOfOrder(userId);
  res.json({
    data: result,
  });
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrderCollection,
  singleUserOrder,
  totalPrice,
};
