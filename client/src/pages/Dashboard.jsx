// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Categories from "../components/Categories";
import Expenses from "../components/Expenses";
import AddCategoryForm from "../components/AddCategoryForm";
import AddExpenseForm from "../components/AddExpenseForm";
import { deleteCategory } from "../services/categoryApi";
import { deleteExpense } from "../services/expenseApi";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  useEffect(() => {
    
    const fetchData = async () => {
      const cats = await import("../services/categoryApi").then((mod) => mod.getCategories());
      setCategories(cats);
      const exps = await import("../services/expenseApi").then((mod) => mod.getExpenses());
      setExpenses(exps);
    };
    fetchData();
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Dashboard</h1>

     
      <div className="mb-5">
        <h3>Categories</h3>
        <Button
          variant={showCategoryForm ? "secondary" : "success"}
          className="mb-3"
          onClick={() => setShowCategoryForm(!showCategoryForm)}
        >
          {showCategoryForm ? "Cancel" : "Add Category"}
        </Button>
        {showCategoryForm && (
          <AddCategoryForm onSuccess={(newCat) => setCategories([...categories, newCat])} />
        )}
        <Categories
  categories={categories}
  onCategoriesChange={setCategories}
/>
      </div>

   
      <div>
        <h3>Expenses</h3>
        <Button
          variant={showExpenseForm ? "secondary" : "primary"}
          className="mb-3"
          onClick={() => setShowExpenseForm(!showExpenseForm)}
          disabled={!categories.length}
        >
          {showExpenseForm ? "Cancel" : "Add Expense"}
        </Button>
        {showExpenseForm && (
          <AddExpenseForm onSuccess={(newExp) => setExpenses([...expenses, newExp])} />
        )}
        <Expenses
  expenses={expenses}
  categories={categories}
  onExpensesChange={setExpenses}
/> 
      </div>
    </Container>
  );
}
