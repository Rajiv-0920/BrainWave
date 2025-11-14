import Enrollment from '../model/enrollment.model.js' // Assuming the path to your updated model
import Course from '../model/course.model.js'
// Note: User model is no longer needed for direct enrollment/fetch, but included for context

// --- Enrollment Endpoint (Refactored to use Enrollment Model) ---
export const enrollInCourse = async (req, res) => {
  const { courseId } = req.body
  // 1. Determine the userId (relying on authentication middleware)
  const userId = req.user._id

  if (!courseId || !userId) {
    return res.status(400).json({ message: 'Missing courseId or userId.' })
  }

  try {
    // 2. Check if the course exists
    const courseExists = await Course.findById(courseId).select('_id').lean()
    if (!courseExists) {
      return res.status(404).json({ message: 'Course not found' })
    }

    // 3. Check for existing enrollment using the Enrollment model
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    })

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: 'User is already enrolled in this course' })
    }

    // 4. Create a new Enrollment document with default progress (0%)
    const newEnrollment = new Enrollment({
      user: userId,
      course: courseId,
      progress: 0,
      completed: false,
    })

    await newEnrollment.save()

    res.status(201).json({
      success: true,
      message: 'Enrollment successful!',
      enrollment: newEnrollment,
    })
  } catch (error) {
    // Handle the compound unique index error (error code 11000) for duplicates
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'User is already enrolled in this course' })
    }

    console.error('Enrollment Error:', error.message)
    res.status(500).json({
      message: 'Server error during enrollment.',
      details: error.message,
    })
  }
}

// --- Get Enrolled Courses Endpoint (Refactored to use Enrollment Model) ---
export const getEnrolledCourses = async (req, res) => {
  // Get userId from authentication middleware
  const userId = req.user._id

  if (!userId) {
    return res.status(400).json({ message: 'Missing userId.' })
  }

  try {
    // 1. Find all enrollment documents for the user
    const enrollments = await Enrollment.find({ user: userId })
      // 2. Populate the 'course' field to get all course details
      .populate({
        path: 'course',
        // Select only necessary course fields for the dashboard card
        select: 'title subtitle instructor category duration thumbnailUrl',
      })
      // 3. Explicitly select enrollment metadata (progress, completed, etc.)
      .select('progress completed enrolledDate')
      .sort({ enrolledDate: -1 }) // Sort by most recently enrolled

    // 4. Transform the data structure: merge enrollment metadata with course details
    const coursesWithProgress = enrollments.map((enrollment) => ({
      // Course details
      _id: enrollment.course._id,
      title: enrollment.course.title,
      subtitle: enrollment.course.subtitle,
      instructor: enrollment.course.instructor,
      category: enrollment.course.category,
      duration: enrollment.course.duration,
      thumbnailUrl: enrollment.course.thumbnailUrl,

      // Enrollment Metadata
      progress: enrollment.progress,
      completed: enrollment.completed,
      enrolledDate: enrollment.enrolledDate,
      enrollmentId: enrollment._id,
    }))

    res.status(200).json({
      success: true,
      courses: coursesWithProgress,
      count: coursesWithProgress.length,
    })
  } catch (error) {
    console.error('Fetch Courses Error:', error.message)
    res.status(500).json({ message: 'Server error fetching courses.' })
  }
}
