import express from 'express'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import courseRoutes from './routes/course.route.js'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import enrollRoutes from './routes/enroll.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 5000
// Connect to Database
connectDB()

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173', // <-- SPECIFY your frontend's URL
    credentials: true, // <-- IMPORTANT: Allow cookies/credentials
  })
)
// Middleware to parse JSON bodies
app.use(express.json())
app.use(cookieParser()) // <-- 2. Use the middleware here!

// Mount the routes
app.use('/api/courses', courseRoutes)
app.use('/api/me', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/enroll', enrollRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
