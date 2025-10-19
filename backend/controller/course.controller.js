// @desc    Create a new course

import { Course } from "../model/course.model.js";

// @route   POST /api/courses
export const createCourse = async (req, res) => {
  try {
    // The JSON data you provided would be in req.body
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get a single course by its ID
// @route   GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
