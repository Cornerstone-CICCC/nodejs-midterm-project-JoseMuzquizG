import { Router } from 'express'
import pageController from '../controllers/page.controller'
import { isAccountLoggedOut } from '../middleware/auth.middleware'

const pageRouter = Router()

pageRouter.get('/', pageController.landing) // page before registering
pageRouter.get('/login', isAccountLoggedOut, pageController.loginPage)
pageRouter.get('/signup', isAccountLoggedOut, pageController.signupPage)


export default pageRouter