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
 * Display the Login/Signup page
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Send home page text
 */
const register = (req: Request, res: Response) => {
    res.status(200).send("Signup/Login Page")
}

export default {
    landing,
    register
}