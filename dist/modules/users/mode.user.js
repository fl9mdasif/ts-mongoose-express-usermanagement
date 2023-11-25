"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import config from '../config';
// sub schema
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        maxlength: [20, "first name can't be greater than 20 by length"],
        validate: function (value) {
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
const userAddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    // _id: false,
});
const userOrderSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
// User Schema
const userSchema = new mongoose_1.Schema({
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
});
// creating middleware
// before sending data to db
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const users = this;
        // Store hashing  password into DB.
        users.password = yield bcrypt_1.default.hash(users.password, Number(config_1.default.bcrypt_salt_round));
        next();
    });
});
// after saved data that works {password = ""}
userSchema.post("save", function (document, next) {
    document.password = "";
    next();
});
// creating custom static methods
userSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ id });
        return existingUser;
    });
};
// User
exports.User = (0, mongoose_1.model)("User", userSchema);
// '"User"' is the collection name
