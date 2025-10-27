// src/components/AddExpenseForm.jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { addExpense } from "../services/expenseApi";
import { getCategories } from "../services/categoryApi";

export default function AddExpenseForm({ onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) throw new Error("User email not found");

      const newExp = await addExpense({ ...form, userEmail });
      onSuccess(newExp);
      setForm({ title: "", amount: "", category: "" });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="d-flex flex-wrap gap-2 mb-3 align-items-center" onSubmit={handleSubmit}>
      <Form.Control
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={{ minWidth: 150 }}
      />
      <Form.Control
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
        style={{ minWidth: 100 }}
      />
      <Form.Select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        style={{ minWidth: 150 }}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c.name}>{c.name}</option>
        ))}
      </Form.Select>
      <Button type="submit" variant="primary" disabled={loading || !categories.length}>
        {loading ? "Adding..." : "Add"}
      </Button>
      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
    </Form>
  );
}
