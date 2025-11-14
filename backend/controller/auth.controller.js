import User from '../model/user.model.js'
import { generateToken } from '../lib/utils.js'

// 1. SIGNUP Controller Logic
export const signup = async (req, res) => {
  const { email, password, name } = req.body

  // Basic input validation
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'User already exists with this email.' })
    }

    // 2. Create the user
    // Mongoose pre-save hook in user.model.js automatically handles password hashing
    const newUser = await User.create({ name, email, password })

    // 3. Generate a token
    // const token = generateToken(newUser._id, res)

    // Save the token to localStorage (or sessionStorage)
    console.log(`User signed up: ${email}`)

    // Only send back non-sensitive user info
    const userResponse = {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    }

    res.status(201).json({
      message: 'User created successfully',
      // token,
      user: userResponse,
    })
  } catch (err) {
    console.error('Signup error:', err)

    // Handle Mongoose validation errors (e.g., minlength, invalid email format)
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message)
      return res.status(400).json({ message: messages.join(', ') })
    }

    res.status(500).json({ message: 'Server error during signup.' })
  }
}

// 2. LOGIN Controller Logic
export const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  try {
    // 1. Find user by email and explicitly include the password field
    // We use .select('+password') because the model set 'select: false' by default
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    // 2. Compare submitted password with stored hash using the schema method
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    // 3. Generate JWT token upon successful login
    const token = generateToken(user._id, res)

    console.log(`User logged in: ${email}`)

    // Only send back non-sensitive user info
    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      user: userResponse,
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error during login.' })
  }
}

export const logout = (req, res) => {
  console.log('Received Cookies:', req.cookies)

  try {
    const cookieOptions = {
      path: '/',
      secure: false,
      sameSite: 'strict',
    }

    res.clearCookie('jwt', cookieOptions)

    res.status(201).json({
      success: true,
      status: 'Success',
      message: 'Logged out successfully. Cookie cleared.',
      isAuthenticated: false, // Added for client-side state management clarity
    })
  } catch (error) {
    console.error('Error in Logout controller:', error.message)
    res.status(500).json({
      success: false,
      status: 'Internal',
      message: 'Internal Server Error',
    })
  }
}
