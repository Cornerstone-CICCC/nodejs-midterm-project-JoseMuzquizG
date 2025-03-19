import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router()

userRouter.post('/signup', userController.addNewUser)
userRouter.post('/login', userController.login)
userRouter.get('/logout', userController.logout)


export default userRouter