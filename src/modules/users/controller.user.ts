import { Request, Response } from "express";
import { userValidationSchema } from "./validation.user";
import { UserServices } from "./service.user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // zod validation parse

    const userZodData = userValidationSchema.parse(userData);

    const result = await UserServices.createUser(userZodData);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
    console.log(err);
  }
};

export const userControllers = {
  createUser,
};
