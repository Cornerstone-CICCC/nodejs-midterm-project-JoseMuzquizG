import { Request, Response } from "express";

/**
 * Display the home page
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Send home page text
 */
const landing = (req: Request, res: Response) => {
    res.status(200).send("Landing Page")
}

/**
 * Renders login page
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders the login page
 */
const loginPage = (req: Request, res: Response) => {
    res.status(200).send("login page")
}

/**
 * Renders signup page
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders the login page
 */
const signupPage = (req: Request, res: Response) => {
    res.status(200).send("signup page")
}

export default {
    landing,
    loginPage,
    signupPage,
}