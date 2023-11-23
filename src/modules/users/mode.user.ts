import { Schema, model } from "mongoose";
import { TUser, TUserName, UserModel } from "./interface.user";
import config from "../../config";
import bcrypt from "bcrypt";
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

// userSchema.post("findOne", async function (document, next) {
//   document.password = "";
//   next();
// });

// creating custom static methods
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

// update order middleware
userSchema.statics.addProductToOrders = async function (
  userId: number,
  orderData: { productName: string; price: number; quantity: number }
) {
  const user = await this.findOne({ userId });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.orders) {
    user.orders.push(orderData);
  } else {
    user.orders = [orderData];
  }

  const updatedUser = await user.save();

  return updatedUser.orders;
};

// find users order
userSchema.statics.getUserOrders = async function (userId: number) {
  const user = await this.findOne({ userId });

  if (!user) {
    throw new Error("User not found");
  }

  return user.orders;
};

export const User = model<TUser, UserModel>("User", userSchema);

// '"User"' is the collection name
