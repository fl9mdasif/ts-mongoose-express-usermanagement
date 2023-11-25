"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_user_1 = require("./controller.user");
const router = express_1.default.Router();
router.get("/:userId", controller_user_1.userControllers.getSingleUser); // use the param 'userId' same to controller
router.put("/:userId", controller_user_1.userControllers.updateUser); // use the param 'userId' same to controller
router.delete("/:userId", controller_user_1.userControllers.deleteUser); // use the param 'userId' same to controller
// order routes
router.put("/:userId/orders", controller_user_1.userControllers.updateUserOrder); // use the param 'userId' same to controller
router.get("/:userId/orders", controller_user_1.userControllers.getUserOrder); // use the param 'userId' same to controller
router.get("/:userId/orders/total-price", controller_user_1.userControllers.calculateOrders); // use the param 'userId' same to controller
router.get("/", controller_user_1.userControllers.getAllUser);
router.post("/", controller_user_1.userControllers.createUser);
exports.userRoute = router;
