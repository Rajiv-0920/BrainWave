import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'

const JWT_SECRET = process.env.JWT_SECRET || 'my-secret'
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '7d',
  })

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: 'strict',
  })

  return token
}

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({
        success: false,
        status: 'Unauthorized',
        message: 'Unauthorized - No Token Provided.',
      })
    }

    const decode = jwt.verify(token, JWT_SECRET)

    if (!decode) {
      return res.status(401).json({
        success: false,
        status: 'Invalid',
        message: 'Unauthorized - Invalid Token.',
      })
    }

    const user = await User.findOne({ _id: decode.userId }).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        status: 'Not Found',
        message: 'User not found.',
      })
    }

    req.user = user
    next()
  } catch (error) {
    console.log(`Error in Protected Route ${error.message}`)
    return res.status(500).json({
      success: false,
      status: 'Internal',
      message: 'Internal Server Error',
    })
  }
}

export const admin = (req, res, next) => {
  // We assume req.user is populated by the 'protect' middleware
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Not authorized as an administrator' }) // Forbidden
    throw new Error('Not authorized as an administrator')
  }
}
