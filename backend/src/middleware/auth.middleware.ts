import { Request, Response, NextFunction } from "express";

export const isAccountLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.isLoggedIn) {
        next()
        return
    }
    res.status(301).redirect("/login")
}

export const isAccountLoggedOut = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.isLoggedIn) {
        res.status(301).send("Redirect to /myaccount")    
        return
    }
    next()
}