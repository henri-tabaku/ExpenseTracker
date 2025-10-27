import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import expensesRoutes from "./routes/Expenses.js";
import categoriesRoutes from "./routes/Categories.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/expenses", expensesRoutes);
app.use("/api/categories", categoriesRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
