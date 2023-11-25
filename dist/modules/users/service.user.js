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
exports.UserServices = void 0;
const mode_user_1 = require("./mode.user");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // built in static instance method
    if (yield mode_user_1.User.isUserExists(userData.userId)) {
        throw new Error("User already exists");
    }
    const result = yield mode_user_1.User.create(userData);
    return result;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mode_user_1.User.aggregate([
        { $project: { userName: 1, fullName: 1, age: 1, email: 1, address: 1 } },
    ]);
    return result;
});
// get single user
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mode_user_1.User.findOne({ userId: id }, { userId: 1, userName: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
    // const result = User.aggregate([{ $match: { userId: id } }]);
});
// update user
const updateUser = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(userId);
    const result = yield mode_user_1.User.updateOne({ userId }, data);
    return result;
});
// delete user
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield mode_user_1.User.isUserExists(id);
    console.log(userExists);
    const result = yield mode_user_1.User.deleteOne({ userId: id });
    return result;
});
// update user order
const updateUserOrder = (id, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mode_user_1.User.updateOne({ userId: id }, { $addToSet: { orders: orderData } });
    return result;
});
// user orders
const getUserOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mode_user_1.User.findOne({ userId: id });
    if (!result) {
        throw new Error("User not found");
    }
    return result === null || result === void 0 ? void 0 : result.orders;
});
const calculateOrders = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield mode_user_1.User.findOne({ userId: id });
    if (!user) {
        throw new Error("User not found");
    }
    const totalOrderPrice = ((_a = user.orders) === null || _a === void 0 ? void 0 : _a.reduce((total, orders) => total + orders.price * orders.quantity, 0)) || 0;
    return totalOrderPrice;
});
exports.UserServices = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    updateUserOrder,
    getUserOrder,
    calculateOrders,
};
