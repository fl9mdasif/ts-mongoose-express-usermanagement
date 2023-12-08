import { z } from 'zod';

const userNameValidation = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const userAddressValidation = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

const userOrderValidation = z.object({
  productName: z.string().min(1, { message: 'Product name is required' }),
  price: z.number().min(0.01, { message: 'Price must be greater than 0' }),
  quantity: z.number().min(1, { message: 'Quantity must be greater than 0' }),
});

// Define the user Validation
export const userValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string().min(1, { message: 'User name is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  fullName: userNameValidation,
  email: z.string().email({ message: 'Invalid email format' }),
  age: z.number().int().positive(),
  hobbies: z.array(z.string()).refine((data) => data.length > 0, {
    message: 'Hobbies must not be empty',
  }),
  address: userAddressValidation,
  isActive: z.boolean().default(true),
  orders: z.array(userOrderValidation).default([]).optional(),
});
