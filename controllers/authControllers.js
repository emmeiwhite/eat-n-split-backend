import { User } from '../models/User.js'
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // 1. Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' })
    }

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // 4. Create User --- Query DB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })

    //  5. Respond
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newuser._id,
        name: newUser.name,
        email: newUser.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function loginUser(req, res) {
  try {
    // 1. Validate Payload
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Provide email and password' })
    }

    // 2. Check whether email exists --- Query Database

    const userExist = await User.findOne({ email })
    if (!userExist) {
      return res.status(400).json({ message: 'User does not exist' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
