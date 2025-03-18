"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Display the home page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Send home page text
 */
const landing = (req, res) => {
    res.status(200).send("Landing Page");
};
/**
 * Display the Login/Signup page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Send home page text
 */
const register = (req, res) => {
    res.status(200).send("Signup/Login Page");
};
exports.default = {
    landing,
    register
};
