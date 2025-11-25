// 3 step process to begin with

import express from 'express'
import { loginUser, registerUser } from '../controllers/authControllers.js'

const router = express.Router()

// 1. REGISTER ROUTE
router.post('/register', registerUser)

// 2. LOGIN ROUTE
router.post('/login', loginUser)

export default router
