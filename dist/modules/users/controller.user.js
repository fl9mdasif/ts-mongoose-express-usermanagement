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
        const { student: userData } = req.body;
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
    }
});
exports.createUser = createUser;
exports.userControllers = {
    createUser: exports.createUser,
};
