import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import courseRoutes from "./routes/course.route.js";
import cors from "cors";

// Connect to Database
connectDB();

const app = express();
app.use(cors()); // allow frontend to access backend

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the routes
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
