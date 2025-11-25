import { User } from '../models/User.js'
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // 1. Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' })
    }

    //   2. Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    res.status(200).json({ message: 'Register endpoint hit' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function loginUser(req, res) {
  // Business logic Here for user login
  try {
    res.status(200).json({ message: 'Login endpoint hit' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// We are not writing any logic yet — just scaffolding.
