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
 * Renders login page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders the login page
 */
const loginPage = (req, res) => {
    res.status(200).send("login page");
};
/**
 * Renders signup page
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders the login page
 */
const signupPage = (req, res) => {
    res.status(200).send("signup page");
};
exports.default = {
    landing,
    loginPage,
    signupPage,
};
