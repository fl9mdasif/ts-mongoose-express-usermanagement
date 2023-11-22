import { Schema, model } from "mongoose";
import { TUser, TUserName, UserModel } from "./interface.users";
// import bcrypt from 'bcrypt';
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
      index: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
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
    orders: { type: [userOrderSchema], default: undefined },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
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

// studentSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const student = this;

//   // Store hash in your password DB.

//   student.password = await bcrypt.hash(
//     student.password,
//     Number(config.bcrypt_salt_round),
//   );
//   next();
// });

// after staved data that works {password = ""}
// studentSchema.post('save', function (document, next) {
//   document.password = '';
//   next();
// });

// creating custom static methods
// studentSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const User = model<TUser, UserModel>("User", userSchema);

// 'Student' is the collection name
