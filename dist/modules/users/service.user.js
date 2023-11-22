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
        throw new Error("Student already exists");
    }
    const result = yield mode_user_1.User.create(userData);
    // # instance
    // built in instance method
    // const student = new Student(studentData);
    // if (await student.isUserExists(studentData.id)) {
    //   throw new Error('student already exists');
    // }
    // const result = await student.save();
    return result;
});
exports.UserServices = {
    createUser,
};
