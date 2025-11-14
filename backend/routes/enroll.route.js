import express from 'express'

const router = express.Router()
import {
  enrollInCourse,
  getEnrolledCourses,
} from '../controller/enrollment.controller.js'
import { protectedRoute } from '../middleware/auth.middleware.js'

router.post('/', protectedRoute, enrollInCourse)
router.get('/my-courses', protectedRoute, getEnrolledCourses)

export default router
