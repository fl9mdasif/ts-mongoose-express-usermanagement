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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = exports.createUser = void 0;
const validation_user_1 = require("./validation.user");
const service_user_1 = require("./service.user");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        // zod validation parse
        const userZodData = validation_user_1.userValidationSchema.parse(userData);
        const result = yield service_user_1.UserServices.createUser(userZodData);
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
        console.log(err);
    }
});
exports.createUser = createUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_user_1.UserServices.getAllUser();
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield service_user_1.UserServices.getSingleUser(userId);
        if (result === null) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const updatedData = req.body;
        const result = yield service_user_1.UserServices.updateUser(userId, updatedData);
        if ((result === null || result === void 0 ? void 0 : result.matchedCount) === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        const userData = {
            userId: updatedData.userId,
            userName: updatedData.userName,
            fullName: updatedData.fullName,
            age: updatedData.age,
            email: updatedData.email,
            isActive: updatedData.isActive,
            hobbies: updatedData.hobbies,
            address: updatedData.address,
        };
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: userData,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
// delete a specific user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // console.log(userId);
        const result = yield service_user_1.UserServices.deleteUser(userId);
        // console.log(result);
        // if (result?.deletedCount === 0) {
        //   res.status(404).json({
        //     success: false,
        //     message: "User not found",
        //     error: {
        //       code: 404,
        //       description: "User not found!",
        //     },
        //   });
        // } else {
        res.status(200).json({
            success: true,
            message: "User Deleted successfully!",
            data: result,
        });
        // }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
// update the order property from order
const updateUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orderData = req.body;
        // console.log(req.params, orderData);
        const result = yield service_user_1.UserServices.updateUserOrder(userId, orderData);
        res.status(200).json({
            success: true,
            message: "Order Created successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
// get all orders of a user
const getUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield service_user_1.UserServices.getUserOrder(userId);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            orders: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
// calculate orders
const calculateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield service_user_1.UserServices.calculateOrders(userId);
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            totalPrice: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
exports.userControllers = {
    createUser: exports.createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    updateUserOrder,
    getUserOrder,
    calculateOrders,
};
