import mongoose from 'mongoose'
const Schema = mongoose.Schema

const EnrollmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
      index: true, // Index for fast lookup by user
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course', // Reference to the Course model
      required: true,
      index: true, // Index for fast lookup by course
    },
    enrolledDate: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0, // Represents the percentage of the course completed (0 to 100)
      min: 0,
      max: 100,
      required: true,
    },
    // You can add more enrollment-specific fields here, like 'progress', 'grade', etc.
  },
  {
    // Ensures a user can only enroll in a course once (unique combination)
    // Note: This requires a unique index in MongoDB outside the schema for true compound unique index.
    // In Mongoose, this is often handled by a compound unique index.
    // EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
  }
)

const Enrollment =
  mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema)
export default Enrollment
