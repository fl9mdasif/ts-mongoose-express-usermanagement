import express from "express";
import { userControllers } from "./controller.user";

const router = express.Router();

router.get("/:userId", userControllers.getSingleUser); // use the param 'userId' same to controller
router.put("/:userId", userControllers.updateUser); // use the param 'userId' same to controller
router.delete("/:userId", userControllers.deleteUser); // use the param 'userId' same to controller

// order routes
router.put("/:userId/orders", userControllers.updateUserOrder); // use the param 'userId' same to controller
router.get("/:userId/orders", userControllers.getUserOrder); // use the param 'userId' same to controller
router.get("/:userId/orders/total-price", userControllers.calculateOrders); // use the param 'userId' same to controller

router.get("/", userControllers.getAllUser);
router.post("/", userControllers.createUser);

export const userRoute = router;
