import mongoose from "mongoose";
import { TOrder, TUser } from "./interface.user";
import { User } from "./mode.user";

const createUser = async (userData: TUser) => {
  // built in static instance method
  if (await User.isUserExists(userData.userId)) {
    throw new Error("Student1 already exists");
  }
  const result = await User.create(userData);

  return result;
};

const getAllUser = async () => {
  const result = await User.aggregate([
    { $project: { userName: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

// get single user
const getSingleUser = async (id: string) => {
  const result = await User.findOne(
    { userId: id },
    { userId: 1, userName: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;

  // const result = User.aggregate([{ $match: { userId: id } }]);
};

// update user
const updateUser = async (id: string, data: TUser) => {
  try {
    const result = await User.updateOne(
      { userId: id },
      {
        $set: {
          userId: data?.userId,
          userName: data.userName,
          fullName: data?.fullName,
          email: data?.email,
          age: data?.age,
          hobbies: data?.hobbies,
          address: data?.address,
          orders: data?.orders,
        },
      },
      {
        new: true,
        // runValidators: true,
      }
    );

    return result;
  } catch (err) {
    throw new Error("error comes from update user");
  }
};

// delete user
const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ userId: id });
  return result;
};

// update user order
const updateUserOrder = async (id: string, orderData: TOrder) => {
  const result = await User.updateOne(
    { userId: id },
    { $addToSet: { orders: orderData } }
  );
  return result;
};

// user orders
const getUserOrder = async (id: string) => {
  const result = await User.findOne({ userId: id });
  if (!result) {
    throw new Error("User not found");
  }
  return result?.orders;
};

export const UserServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserOrder,
  getUserOrder,
};
