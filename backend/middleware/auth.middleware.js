import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    console.log(token)
    if (!token) {
      return res.status(401).json({
        success: false,
        status: 'Unauthorized',
        message: 'Unauthorized - No Token Provided.',
      })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

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
