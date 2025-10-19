import mongoose, { Schema } from "mongoose";

// Sub-schema for downloadable resources in a lesson
const ResourceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

// Sub-schema for quiz questions
const QuestionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

// Sub-schema for individual lessons within a module
const LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["video", "text", "quiz"], // Restrict to specific lesson types
    required: true,
  },
  duration: {
    type: Number, // Duration in seconds, only for 'video' type
  },
  videoUrl: {
    type: String, // URL for 'video' type
  },
  content: {
    type: String, // HTML or Markdown content for 'text' type
  },
  isPreviewable: {
    type: Boolean,
    default: false,
  },
  resources: [ResourceSchema],
  questions: [QuestionSchema], // Only for 'quiz' type
});

// Sub-schema for course modules
const ModuleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  lessons: [LessonSchema],
});

// Main Course Schema
const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    instructor: {
      // Storing as a nested object
      name: { type: String, required: true },
      bio: { type: String },
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    tags: [String],
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true, default: "USD" },
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    rating: {
      average: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
    },
    estimatedDuration: {
      type: String, // e.g., "12 hours"
    },
    modules: [ModuleSchema],
  },
  {
    // Mongoose automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", CourseSchema);
