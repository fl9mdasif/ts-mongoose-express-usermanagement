import express from "express";
import { userControllers } from "./controller.user";

const router = express.Router();

router.get("/:userId", userControllers.getSingleUser); // use the param 'userId' same to controller
router.put("/:userId", userControllers.updateUser); // use the param 'userId' same to controller
router.put("/:userId/orders", userControllers.updateOrder); // use the param 'userId' same to controller
router.delete("/:userId", userControllers.deleteUser); // use the param 'userId' same to controller

router.get("/", userControllers.getAllUser);
router.post("/", userControllers.createUser);

export const userRoute = router;
