import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = process.env.MONGO_URI;
await mongoose.connect(uri);
console.log("Connected to MongoDB");

// Middleware
app.use(cors());
app.use(express.json());

// API routes FIRST
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

// Static frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all LAST
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
