import { Schema, model } from "mongoose";
import { TUser, TUserName, UserModel } from "./interface.user";
import config from "../../config";
import bcrypt from "bcrypt";
import { response } from "express";
// import config from '../config';

// sub schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [20, "first name can't be greater than 20 by length"],
    validate: function (value: string) {
      // validate mongoose inbuilt validator

      const nameCapitalized = value.charAt(0).toUpperCase() + value.slice(1);
      return value === nameCapitalized;
    },
  },

  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

const userAddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userOrderSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    fullName: userNameSchema,

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    age: Number,
    hobbies: { type: [String], required: true },
    address: {
      type: userAddressSchema,
      required: [true, "address is required"],
    },
    isActive: {
      type: Boolean,
      required: [true, "Status is required"],
      default: true,
    },
    orders: { type: [userOrderSchema] },
  }
  // {
  //   toJSON: {
  //     virtuals: true,
  //   },
  // }
);

// Virtual adds a new field

// studentSchema.virtual('fullName').get(function () {
//   return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
// });

// Query Middleware

// studentSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } }); // checks isDeleted
//   next();
// });

// studentSchema.pre('findOne', function (next) {
//   this.findOne({ isDeleted: { $ne: true } }); // checks isDeleted
//   next();
// });

// match and return if isDeleted is false?

// studentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });
// creating middleware

// before sending data to db
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const users = this;

  // Store hashing  password into DB.

  users.password = await bcrypt.hash(
    users.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

// after saved data that works {password = ""}
userSchema.post("save", function (document, next) {
  document.password = "";
  next();
});

// update user with static methods
userSchema.statics.updateUserInformation = async function (
  userId: number,
  updatedData: TUser
) {
  try {
    // console.log("Updating user with ID:", userId);
    // console.log("Updated data:", updatedData);

    const singleUser = await User.findOne({ userId });
    if (!singleUser) {
      throw new Error("user not found");
    }

    // update user Information
    singleUser.userId =
      updatedData.userId !== undefined ? updatedData.userId : singleUser.userId;
    singleUser.userName = updatedData.userName || singleUser.userName;
    singleUser.fullName = updatedData.fullName || singleUser.fullName;
    singleUser.email = updatedData.email || singleUser.email;
    singleUser.age = updatedData.age || singleUser.age;
    singleUser.hobbies = updatedData.hobbies || singleUser.hobbies;
    singleUser.address = updatedData.address || singleUser.address;
    singleUser.isActive =
      updatedData.isActive !== undefined
        ? updatedData.isActive
        : singleUser.isActive;
    singleUser.orders = updatedData.orders || singleUser.orders;

    const updatedUser = await singleUser.save((err, saved) => {
      if (err) {
        return response.status(500).send(err);
      }
      return response.json({ user: saved });
    });

    console.log("this", updatedUser);

    // Exclude the password field from the response
    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};

// creating custom static methods
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

// User
export const User = model<TUser, UserModel>("User", userSchema);

// '"User"' is the collection name
