import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://rajivkumar8163_db_user:ow1neMdWT2KuqLVi@cluster0.0yfawlm.mongodb.net/EduHub?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  }
};
