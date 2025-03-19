import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";

/**
 * Add new user 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} // Returns new user to users array
*/
const addNewUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const { fullname, username, password } = req.body
    if (!fullname || !username || !password) {
        res.status(500).send("Missing details")
        return
    }
    const user = await userModel.createUser({ fullname, username, password })
    if (!user) {
        res.status(409).send("Username already taken")
        return
    }
    res.status(201).json({message: "Account successfully created", user})
}

/**
 * Logs in user
 * 
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} Checks username and password and set session cookie.
 */
const login = async (req: Request<{}, {}, Omit<User,'id'>>, res: Response) => {
    const {username, password} = req.body
    const user = await userModel.loginUser(username, password)
    if (!user) {
        res.status(404).send("Wrong Credentials")
        return
    }
    if (req.session) {
        req.session.isLoggedIn = true
        req.session.username = user.username
    }
    res.status(200).json(user)
}

const logout = (req: Request, res: Response) => {
    req.session = null
    res.status(200).json({message: "Logged out successfully"})
}


export default {
    addNewUser,
    login,
    logout
}