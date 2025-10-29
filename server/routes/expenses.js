// routes/expenses.js
import express from "express";
import Expense from "../models/Expense.js";
import User from "../models/User.js";
import { sendEmail } from "../services/EmailService.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ 
        ok: false, 
        error: "User not found" 
      });
    }

    // filter by categoryId via query param
    const { categoryId } = req.query;
    const filter = { user: user._id };
    if (categoryId) {
      filter.categoryId = categoryId;
    }

    const expenses = await Expense.find(filter)
      .populate('categoryId', 'name');

    if (!expenses.length) {
      return res.status(404).json({ 
        ok: false, 
        error: "No expenses found" 
      });
    }

    return res.status(200).json({ 
      ok: true, 
      data: expenses 
    });
  } catch (err) {
    return res.status(500).json({ 
      ok: false, 
      error: err.message 
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { description, amount, categoryId, email } = req.body;

    if (!description || !amount || !categoryId || !email) {
      return res.status(400).json({ 
        ok: false, 
        error: "Missing required fields: description, amount, categoryId, and email are required" 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        ok: false, 
        error: "User not found" 
      });
    }

    // Check expense limit
    const newTotal = user.totalAmount + Number(amount);
    if (newTotal > 1000) {
      await sendEmail(
        email,
        "Expense Limit Exceeded",
        `<h3>Expense Limit Alert</h3>
         <p>Hello,</p>
         <p>Your total expenses have exceeded the <b>$1000</b> limit.</p>
         <p>Current total (including attempted expense): <b>$${newTotal}</b>.</p>
         <p>Please review your spending habits.</p>`
      );

      return res.status(400).json({
        ok: false,
        error: "Total amount exceeds $1000. Expense not added."
      });
    }

    const expense = new Expense({
      description,
      amount,
      categoryId,
      user: user._id
    });

    const savedExpense = await expense.save();

    // Update user total
    user.totalAmount = newTotal;
    await user.save();

    return res.status(201).json({ 
      ok: true, 
      data: savedExpense 
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ 
      ok: false, 
      error: error.message 
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ 
        ok: false, 
        error: "Expense not found" 
      });
    }

    const user = await User.findById(expense.user);
    if (!user) {
      return res.status(404).json({ 
        ok: false, 
        error: "Associated user not found" 
      });
    }

    // Update user total and delete expense
    user.totalAmount = Math.max(0, (user.totalAmount || 0) - expense.amount);
    await user.save();
    await Expense.findByIdAndDelete(req.params.id);

    return res.status(200).json({ 
      ok: true, 
      data: { 
        message: "Expense deleted successfully",
        updatedTotal: user.totalAmount 
      }
    });
  } catch (err) {
    return res.status(500).json({ 
      ok: false, 
      error: err.message 
    });
  }
});

export default router;
