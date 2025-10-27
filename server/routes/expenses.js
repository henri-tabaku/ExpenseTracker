// routes/expenses.js
import express from "express";
import Expense from "../models/Expense.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const expenses = await Expense.find({ user: user._id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { title, amount, category,  date, email } = req.body;

//     if (!title || !amount || !category || !email) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Find or create user
//     let user = await User.findOne({ email });
//     if (!user) {
//       user = new User({ email });
//       await user.save();
//     }

  
//     const expense = new Expense({
//       title,
//       amount,
//       category,
//       date,
//       user: user._id,
//     });
//     const newExpense = await expense.save();
//     console .log( amount)
//     console .log( expense.amount)

    
//     user.totalAmount = (user.totalAmount || 0) + expense.amount;

//     await user.save();

//     res.status(201).json(newExpense);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { title, amount, category, email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Check if total will exceed 1500
    const newTotal = user.totalAmount + Number(amount);
    if (newTotal > 1500) {
      // Send alert email and stop expense creation
      await sendEmail(
        email,
        " Expense Limit Exceeded",
        `<h3>Expense Limit Alert</h3>
         <p>Hello,</p>
         <p>Your total expenses have exceeded the <b>$1500</b> limit.</p>
         <p>Current total (including attempted expense): <b>$${newTotal}</b>.</p>
         <p>Please review your spending habits.</p>`
      );

      return res.status(400).json({
        message: "Total amount exceeds $1500. Expense not added.",
      });
    }

    // Otherwise, create expense
    const expense = new Expense({
      title,
      amount,
      category,
      email,
    });

    await expense.save();

    // Update user total
    user.totalAmount = newTotal;
    await user.save();

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    
    const user = await User.findById(expense.user);
    if (user) {
      user.totalAmount =(user.totalAmount || 0) - expense.amount;
      await user.save();
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
