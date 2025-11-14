import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    // Prevents the password hash from being returned in general queries
    select: false,
  },
  // --- NEW ROLE FIELD ---
  role: {
    type: String,
    enum: ['user', 'admin'], // Restricts the values to either 'user' or 'admin'
    default: 'user', // Default role for new signups
  },
  // ----------------------
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Middleware to hash password before saving (Mongoose pre-hook)
UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Method to compare submitted password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // The `this.password` field is accessible here because we explicitly retrieve it in the login controller
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User
