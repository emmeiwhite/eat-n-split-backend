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

    console.log('password hashed', hashedPassword)

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
        _id: newUser._id,
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

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' })
    }

    // 3. Compare the hashedPassword with the password provided
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Password is incorrect!' })
    }

    // ⭐ Create a session (old-school auth)
    req.session.userId = user._id
    /** The above line of code is basically used to maintain session. Internally express-session handles it all. Ultimately connect.sid is returned to the FE for the Browser to save it in cookie. And store user details in the global state */

    /** session.userId is a temporary id, and it is not the same as user._id, sessionID is totally different from the user._id */
    // 4 Remove password before sending user back
    user.password = undefined

    // 5. Respond
    return res.status(200).json({
      message: 'Login successful',
      user
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function logoutUser(req, res) {
  try {
    // 1. Destroy session
    req.session.destroy(err => {
      if (err) {
        console.log('Session destruction error:', err)
        return res.status(500).json({ message: 'Logout failed' })
      }

      // 2. Clear the session cookie
      res.clearCookie('connect.sid', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
      })

      return res.status(200).json({ message: 'Logged out successfully' })
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error during logout' })
  }
}

// CRUD: For Admin Dashboard
export async function getAllUsers(req, res) {
  try {
    const users = await User.find().select('-password') // ensure password is not returned
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' })
  }
}
