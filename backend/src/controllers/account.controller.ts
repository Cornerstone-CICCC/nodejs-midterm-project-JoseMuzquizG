import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../types/user";

/**
 * Renders home account
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Renders home account page
 */
const homeAccount = (req: Request, res: Response) => {
    res.status(200).send("Home Account Page")
}

/**
 * Renders profile page
 * 
 * @param {Request} req 
 * @param {Response} res
 * @returns {void} Redirects to profile page /:username/profile 
 */
const profile = async (req: Request<{username: string}>, res: Response) => {
    const { username } = req.params
    const user = userModel.findByUsername(username)
    if (!user) {
        res.status(404).send("this user does not exist")
        return
    }
    res.status(200).json({message: "Welcome to your profile", userInfo: user})
}

/**
 * Edits user information
 * 
 * @param {Request<{id: string}, {}, Partial<User>>} req
 * @param {Response} res
 * @returns {void} Returns all changes for user
 */
const editUserInfo = async (req: Request<{id: string}, {}, Partial<User>>, res: Response) => {
    const { id } = req.params
    const { fullname, username, password, email } = req.body
    const user = await userModel.updateUser(id, { fullname, username, password, email  })
    if (!user) {
        res.status(404).send("User not found")
        return
    }
    res.status(200).json({ message: "Successfully changed your details", newInfo: user})
}

export default {
    homeAccount,
    profile,
    editUserInfo
}