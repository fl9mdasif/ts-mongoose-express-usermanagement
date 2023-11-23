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

const updateUser = async (id: string, data: TUser) => {
  const result = await User.updateOne(
    { userId: id },
    { $set: data },
    {
      new: true,
    }
  );
  console.log("up", result);
  return result;
};
const updateUserOrder = async (id: string, data: TOrder) => {
  const result = await User.addProductToOrders(Number(id), data);
  // console.log("up", result);
  return result;
};

// delete user
const deleteUser = async (id: string) => {
  const result = await User.deleteOne({ userId: id });
  return result;
};

export const UserServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserOrder,
};
