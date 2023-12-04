import { Request, Response } from 'express';
import { userValidationSchema } from './validation.user';
import { UserServices } from './service.user';
import { TUser } from './interface.user';
import { User } from './mode.user';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // zod validation parse
    const userZodData = userValidationSchema.parse(userData);

    // built in static instance method
    if (await User.isUserExists(userData.userId)) {
      throw new Error('User already exists');
    }
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

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const result = await UserServices.getSingleUser(userId);
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
    const updatedData: Partial<TUser> = req.body;

    if ((await User.isUserExists(userId)) == null) {
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
      userId: updatedData?.userId,
      userName: updatedData?.userName,
      fullName: updatedData?.fullName,
      age: updatedData?.age,
      email: updatedData?.email,
      isActive: updatedData?.isActive,
      hobbies: updatedData?.hobbies,
      address: updatedData?.address,
    };
    await UserServices.updateUser(userId, updatedData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      // data: userData,
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

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // const result = await UserServices.deleteUser(userId);
    await UserServices.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: 'User Deleted successfully!',
      data: null,
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

// update the order property from order
const updateUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    await UserServices.updateUserOrder(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order Created successfully!',
      data: null,
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

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const result = await UserServices.getUserOrder(userId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: { orders: result },
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

    if ((await User.isUserExists(userId)) == null) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
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
