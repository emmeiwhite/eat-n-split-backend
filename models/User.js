import mongoose from 'mongoose'

// Step-1: Create User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false // don't return password in queries
    }
  },
  { timestamps: true } // automatically createdAt + updatedAt
)

// Step-2: Create User Model

const User = mongoose.model('User', userSchema)

export { User }
