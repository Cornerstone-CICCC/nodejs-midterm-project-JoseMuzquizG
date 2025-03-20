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
 * Add new user
 * @param {Request} req
 * @param {Response} res
 * @returns {void} // Returns new user to users array
*/
const addNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, password } = req.body;
    if (!fullname || !username || !password) {
        res.status(500).send("Missing details");
        return;
    }
    const user = yield user_model_1.default.createUser({ fullname, username, password });
    if (!user) {
        res.status(409).send("Username already taken");
        return;
    }
    res.status(201).json({ message: "Account successfully created", user });
});
/**
 * Logs in user
 *
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} Checks username and password and set session cookie.
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_model_1.default.loginUser(username, password);
    if (!user) {
        res.status(404).send("Wrong Credentials");
        return;
    }
    if (req.session) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
    }
    res.status(200).json(user);
});
/**
 * Logs out user
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} erases all cookies.
 */
const logout = (req, res) => {
    req.session = null;
    res.status(200).json({ message: "Logged out successfully" });
};
/**
 * Login / home page redirect
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Redirects to /accounts/home if logged in, to /accounts/loggin if not logged in
 */
const homeLoginRedir = (req, res) => {
    res.status(200).send("redirect to /myaccount");
};
/**
 * Delete user by id
 *
 * @param {Request<{id: string}>} req
 * @param {Response} res
 * @returns {void} returns succes or fail message
 */
const deleteUserById = (req, res) => {
    const { id } = req.params;
    const result = user_model_1.default.removeUserById(id);
    if (!result) {
        res.status(409).json({ message: "User not found" });
        return;
    }
    req.session = null;
    res.status(200).json({ message: "Deleted your account" });
};
exports.default = {
    addNewUser,
    login,
    logout,
    homeLoginRedir,
    deleteUserById
};
