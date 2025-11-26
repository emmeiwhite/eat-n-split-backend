import { config } from 'dotenv'
config()
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

const PORT = process.env.PORT || 5000

// connect to DB
connectDB()

// Body Parser Middleware
app.use(express.json())
app.use(cookieParser())

// ⭐ Session Setup (OLD AMAZON STYLE)
app.use(
  session({
    secret: process.env.SESSION_SECRET, // keep in env
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // JS cannot access cookie
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false // true only in production with HTTPS
    }
  })
)

// Hook AuthRoute
app.use('/api/auth', authRoutes)

// Test Route
app.get('/', (req, res) => {
  res.send('API is working...')
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
