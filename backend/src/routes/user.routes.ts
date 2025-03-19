import { Router } from "express";
import userController from "../controllers/user.controller";
import { isAccountLoggedIn } from "../middleware/auth.middleware";

const userRouter = Router()

userRouter.post('/signup', userController.addNewUser)
userRouter.post('/login', userController.login)
userRouter.get('/logout', userController.logout)
userRouter.get('/', isAccountLoggedIn, userController.homeLoginRedir)


export default userRouter