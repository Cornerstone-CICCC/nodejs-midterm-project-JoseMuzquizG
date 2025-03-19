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
exports.default = {
    landing
};
