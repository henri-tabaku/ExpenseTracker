// dotenv is loaded via the top-level import 'dotenv/config'
import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import expensesRoutes from "./routes/Expenses.js";
import categoriesRoutes from "./routes/categories.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expensesRoutes);
app.use("/api/categories", categoriesRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
