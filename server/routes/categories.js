// routes/categories.js
import express from "express";
import Category from "../models/Category.js";
import User from "../models/User.js";

const router = express.Router();


router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const categories = await Category.find({ user: user._id });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "Name and email required" });

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    const category = new Category({ name, user: user._id });
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;


