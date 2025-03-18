import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieSession from 'cookie-session'
import cookieParser from 'cookie-parser'
import pageRouter from './routes/page.routes'

const app = express()

// Middelware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const SIGN_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if (!SIGN_KEY || !ENCRYPT_KEY) {
    throw new Error('Missing cookies keys.')
}

//Routes
app.use('/', pageRouter)

// Server Fallback
app.use((req: Request, res: Response) => {
    res.status(404).send("Page not found! :(")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})