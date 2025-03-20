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
const user_model_1 = __importDefault(require("../models/user.model"));
/**
 * Renders home account
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders home account page
 */
const homeAccount = (req, res) => {
    res.status(200).send("Home Account Page");
};
/**
 * Renders profile page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Redirects to profile page /:username/profile
 */
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = user_model_1.default.findByUsername(username);
    if (!user) {
        res.status(404).send("this user does not exist");
        return;
    }
    res.status(200).json({ message: "Welcome to your profile", userInfo: user });
});
/**
 * Edits user information
 *
 * @param {Request<{id: string}, {}, Partial<User>>} req
 * @param {Response} res
 * @returns {void} Returns all changes for user
 */
const editUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { fullname, username, password, email } = req.body;
    const user = yield user_model_1.default.updateUser(id, { fullname, username, password, email });
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    res.status(200).json({ message: "Successfully changed your details", newInfo: user });
});
exports.default = {
    homeAccount,
    profile,
    editUserInfo
};
