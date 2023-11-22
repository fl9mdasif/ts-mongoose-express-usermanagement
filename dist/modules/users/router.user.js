"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_user_1 = require("./controller.user");
const router = express_1.default.Router();
router.post("/", controller_user_1.userControllers.createUser);
// router.get("/", userControllers.getAllUser);
// router.get("/:userId", userControllers.getSingleUser); // use the param 'studentId' same to controller
// router.delete("/:studentId", userControllers.deleteUser); // use the param 'studentId' same to controller
exports.userRoute = router;
