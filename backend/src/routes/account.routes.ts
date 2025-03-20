import { Router } from "express";
import accountController from "../controllers/account.controller";
import { isAccountLoggedIn } from "../middleware/auth.middleware";

const accountRouter = Router()

accountRouter.get('/', isAccountLoggedIn, accountController.homeAccount) //logged in home
accountRouter.get('/:username', isAccountLoggedIn, accountController.profile)
accountRouter.put('/edit/:id', isAccountLoggedIn, accountController.editUserInfo)


export default accountRouter