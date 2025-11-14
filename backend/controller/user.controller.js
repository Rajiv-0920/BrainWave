import User from '../model/user.model.js'

export const getUserDetails = async (req, res) => {
  try {
    // Get the ID from the payload attached by verifyToken middleware
    const userId = req.user._id
    // 1. Look up user details in MongoDB using Mongoose
    const user = await User.findById(userId)

    // 2. Handle scenario where user ID from token is valid but the user record is deleted
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }

    // 3. Success: Return the cleaned user profile (exclude sensitive data)
    const userProfile = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
    }

    return res.status(200).json(userProfile)
  } catch (error) {
    // Handle any errors (e.g., database connection issues, invalid ID format)
    console.error('Error fetching user details:', error)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}
