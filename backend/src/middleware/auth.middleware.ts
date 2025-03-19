import { Request, Response, NextFunction } from "express";

export const isAccountLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.isLoggedIn) {
        next()
        return
    }
    res.status(301).send("Redirect to login")
}