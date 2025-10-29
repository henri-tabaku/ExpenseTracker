// routes/categories.js
import express from "express";
import Category from "../models/Category.js";
import User from "../models/User.js";
const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ ok: false, error: "User not found" });

    const categories = await Category.find({ user: user._id });
    if (!categories.length) return res.status(404).json({ ok: false, error: "No categories found" });

    return res.status(200).json({ ok: true, data: categories });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ 
        ok: false, 
        error: "Name and email required" 
      });
    }

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    const category = new Category({ name, user: user._id });
    const newCategory = await category.save();
    return res.status(201).json({ 
      ok: true, 
      data: newCategory 
    });
  } catch (err) {
    return res.status(500).json({ 
      ok: false, 
      error: err.message 
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ 
        ok: false, 
        error: "Category not found" 
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({ 
      ok: true, 
      data: { message: "Category deleted successfully" } 
    });
  } catch (err) {
    return res.status(500).json({ 
      ok: false, 
      error: err.message 
    });
  }
});

export default router;
