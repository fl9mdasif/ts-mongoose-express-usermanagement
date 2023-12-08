import config from '../../config';
import { TOrder, TUser } from './interface.user';
import { User } from './model.user';
import bcrypt from 'bcrypt';

const createUser = async (userData: TUser) => {
  const result = await User.create(userData);

  return result;
};

const getAllUser = async () => {
  const result = await User.find();

  return result;
};

// get single user
const getSingleUser = async (id: string) => {
  const result = await User.findOne({ userId: id });
  return result;

  // const result = User.aggregate([{ $match: { userId: id } }]);
};

// update user
const updateUser = async (userId: number, data: TUser) => {
  if (data.password) {
    data.password = await bcrypt.hash(
      data.password,
      Number(config.bcrypt_salt_round),
    );
  }

  const result = await User.updateOne({ userId }, data);
  return result;
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
    { $addToSet: { orders: orderData } },
  );
  return result;
};

// user orders
const getUserOrder = async (id: string) => {
  const result = await User.findOne({ userId: id });

  return result?.orders;
};

// calculate total price
const calculateOrders = async (id: string) => {
  const user = await User.findOne({ userId: id });

  const totalOrderPrice =
    user?.orders?.reduce(
      (total, orders) => total + orders.price * orders.quantity,
      0,
    ) || 0;
  return totalOrderPrice;
};

export const UserServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateUserOrder,
  getUserOrder,
  calculateOrders,
};
