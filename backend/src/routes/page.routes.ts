import { Router } from 'express'
import pageController from '../controllers/page.controller'

const pageRouter = Router()

pageRouter.get('/', pageController.landing) // page before registering
pageRouter.get('/register', pageController.register)


export default pageRouter