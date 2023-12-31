"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_user_1 = require("./modules/users/router.user");
// import { studentRoute } from './app/modules/students/route.student';
const app = (0, express_1.default)();
// parser middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use('/api/users', router_user_1.userRoute);
app.get('/', (req, res) => {
    res.send('Hello from next level developer');
});
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route not find',
    });
});
exports.default = app;
