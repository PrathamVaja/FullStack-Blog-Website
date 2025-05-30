import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import mongodb_connection from './db/mongodb.js'
import userRouter from './routes/user.route.js'
import morgan from 'morgan'
dotenv.config();
import cors from 'cors'
import cookieParser from 'cookie-parser'
import BlogRouter from './routes/blog.route.js'

const app = express()
mongodb_connection()

app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors());
app.use(morgan('dev'))


const port = process.env.PORT

app.use('/api/user', userRouter);
app.use('/api/blog',BlogRouter)


app.listen(port, () => {
    console.log('server running on ' , port)
})
