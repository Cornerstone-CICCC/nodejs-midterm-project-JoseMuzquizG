"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.post('/signup', user_controller_1.default.addNewUser);
userRouter.post('/login', user_controller_1.default.login);
userRouter.get('/logout', user_controller_1.default.logout);
userRouter.get('/', auth_middleware_1.isAccountLoggedIn, user_controller_1.default.homeLoginRedir);
exports.default = userRouter;
