import express from "express";
import { userControllers } from "./controller.user";

const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", userControllers.getAllUser);
router.get("/:userId", userControllers.getSingleUser); // use the param 'studentId' same to controller
router.put("/:userId", userControllers.updateUser); // use the param 'studentId' same to controller
router.delete("/:userId", userControllers.deleteUser); // use the param 'studentId' same to controller

export const userRoute = router;
