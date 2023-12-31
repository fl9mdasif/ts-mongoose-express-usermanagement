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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const model_user_1 = require("./model.user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_user_1.User.create(userData);
    return result;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_user_1.User.find();
    return result;
});
// get single user
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_user_1.User.findOne({ userId: id });
    return result;
    // const result = User.aggregate([{ $match: { userId: id } }]);
});
// update user
const updateUser = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.password) {
        data.password = yield bcrypt_1.default.hash(data.password, Number(config_1.default.bcrypt_salt_round));
    }
    const result = yield model_user_1.User.updateOne({ userId }, data);
    return result;
});
// delete user
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_user_1.User.deleteOne({ userId: id });
    return result;
});
// update user order
const updateUserOrder = (id, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_user_1.User.updateOne({ userId: id }, { $addToSet: { orders: orderData } });
    return result;
});
// user orders
const getUserOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_user_1.User.findOne({ userId: id });
    return result === null || result === void 0 ? void 0 : result.orders;
});
const calculateOrders = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield model_user_1.User.findOne({ userId: id });
    const totalOrderPrice = ((_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.reduce((total, orders) => total + orders.price * orders.quantity, 0)) || 0;
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
