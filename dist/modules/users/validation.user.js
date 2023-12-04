"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const userNameValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(1, { message: 'First name is required' }),
    lastName: zod_1.z.string().min(1, { message: 'Last name is required' }),
});
const userAddressValidation = zod_1.z.object({
    street: zod_1.z.string().min(1, { message: 'Street is required' }),
    city: zod_1.z.string().min(1, { message: 'City is required' }),
    country: zod_1.z.string().min(1, { message: 'Country is required' }),
});
const userOrderValidation = zod_1.z.object({
    productName: zod_1.z.string().min(1, { message: 'Product name is required' }),
    price: zod_1.z.number().min(0.01, { message: 'Price must be greater than 0' }),
    quantity: zod_1.z.number().min(1, { message: 'Quantity must be greater than 0' }),
});
// Define the user Validation
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive(),
    userName: zod_1.z.string().min(1, { message: 'User name is required' }),
    password: zod_1.z.string().min(1, { message: 'Password is required' }),
    fullName: userNameValidation,
    email: zod_1.z.string().email({ message: 'Invalid email format' }),
    age: zod_1.z.number().int().positive(),
    hobbies: zod_1.z.array(zod_1.z.string()).refine((data) => data.length > 0, {
        message: 'Hobbies must not be empty',
    }),
    address: userAddressValidation,
    isActive: zod_1.z.boolean().default(true),
    orders: zod_1.z.array(userOrderValidation).default([]).optional(),
});
