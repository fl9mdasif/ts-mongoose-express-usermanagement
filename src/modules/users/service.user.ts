import { TUser } from "./interface.user";
import { User } from "./mode.user";

const createUser = async (userData: TUser) => {
  // built in static instance method
  if (await User.isUserExists(userData.userId)) {
    throw new Error("Student1 already exists");
  }
  const result = await User.create(userData);

  // # instance
  // built in instance method
  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('student already exists');
  // }
  // const result = await student.save();

  return result;
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

// get single user
const getSingleUser = async (id: string) => {
  const result = await User.findOne({ id });
  return result;
};

const updateUser = async (id: string, data: TUser) => {
  const result = await User.updateOne({ id }, {}, data);
  return result;
};

const deleteUser = async (id: string) => {
  if (await User.isUserExists(id)) {
    const result = await User.deleteOne({ id });
    return result;
  }
  throw new Error(
    JSON.stringify({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    })
  );
};

export const UserServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
