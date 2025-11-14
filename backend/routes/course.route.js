import express from 'express'
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from '../controller/course.controller.js'
import { protectedRoute } from '../middleware/auth.middleware.js'
import { admin } from '../lib/utils.js'

const router = express.Router()

// Route for getting all courses and creating a new one
router.route('/').get(getAllCourses).post(protectedRoute, admin, createCourse)

// Route for getting, updating, and deleting a single course by its ID
router.route('/:id').get(getCourseById).put(updateCourse).delete(deleteCourse)

export default router
