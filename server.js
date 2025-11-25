import { config } from 'dotenv'
config()
import express from 'express'

import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

const PORT = process.env.PORT || 5000

// connect to DB
connectDB()

// Body Parser Middleware
app.use(express.json())

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
