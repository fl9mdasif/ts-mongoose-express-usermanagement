import express from "express";
import { userControllers } from "./controller.user";

const router = express.Router();

router.post("/create-user", userControllers.createUser);
// router.get("/", userControllers.getAllUser);
// router.get("/:userId", userControllers.getSingleUser); // use the param 'studentId' same to controller
// router.delete("/:studentId", userControllers.deleteUser); // use the param 'studentId' same to controller

export const userRoute = router;
