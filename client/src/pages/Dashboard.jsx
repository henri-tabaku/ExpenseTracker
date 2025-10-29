import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Categories from "../components/Categories";
import Expenses from "../components/Expenses";
import AddCategoryForm from "../components/AddCategoryForm";
import AddExpenseForm from "../components/AddExpenseForm";
import { useCategories } from "../hooks/useCategories";
import { useExpenses } from "../hooks/useExpenses";
// import { deleteCategory } from "../services/categoryApi";
// import { deleteExpense } from "../services/expenseApi";

export default function Dashboard() {
  const [categories, setCategories] = useCategories([]);
  const [expenses, setExpenses] = useExpenses([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);


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
