"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = __importDefault(require("../controllers/account.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const accountRouter = (0, express_1.Router)();
accountRouter.get('/', auth_middleware_1.isAccountLoggedIn, account_controller_1.default.homeAccount); //logged in home
accountRouter.get('/:username', auth_middleware_1.isAccountLoggedIn, account_controller_1.default.profile);
accountRouter.put('/edit/:id', auth_middleware_1.isAccountLoggedIn, account_controller_1.default.editUserInfo);
exports.default = accountRouter;
