import { Request, Response } from 'express';
import { userValidationSchema } from './validation.user';
import { UserServices } from './service.user';
import { TUser } from './interface.user';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // zod validation parse
    const userZodData = userValidationSchema.parse(userData);

    const result = await UserServices.createUser(userZodData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
    // console.log(err);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUser();

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getSingleUser(userId);

    if (result === null) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updatedData: TUser = req.body;

    const result = await UserServices.updateUser(userId, updatedData);
    if (result?.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const userData = {
      userId: updatedData.userId,
      userName: updatedData.userName,
      fullName: updatedData.fullName,
      age: updatedData.age,
      email: updatedData.email,
      isActive: updatedData.isActive,
      hobbies: updatedData.hobbies,
      address: updatedData.address,
    };

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: userData,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// delete a specific user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // console.log(userId);

    const result = await UserServices.deleteUser(userId);

    if (result?.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User Deleted successfully!',
        data: result,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// update the order property from order
const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;
    // console.log(req.params, orderData);

    const result = await UserServices.updateUserOrder(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order Created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// get all orders of a user
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getUserOrder(userId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      orders: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

// calculate orders
const calculateOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.calculateOrders(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      totalPrice: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserOrder,
  getUserOrder,
  calculateOrders,
};
