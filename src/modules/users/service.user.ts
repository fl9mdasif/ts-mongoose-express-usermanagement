import { TUser } from "./interface.user";
import { User } from "./mode.user";

const createUser = async (userData: TUser) => {
  // built in static instance method
  if (await User.isUserExists(userData.userId)) {
    throw new Error("Student already exists");
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

const deleteSingleStudent = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const UserServices = {
  createUser,
  getAllUser,
  getSingleUser,
};
