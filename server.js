import { config } from 'dotenv'
config()
import express from 'express'

import connectDB from './config/db.js'

const app = express()

const PORT = process.env.PORT || 5000

// connect to DB
connectDB()

// Test Route
app.get('/', (req, res) => {
  res.send('API is working...')
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
