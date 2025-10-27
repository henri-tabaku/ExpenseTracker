// src/components/AddCategoryForm.jsx
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { addCategory } from "../services/categoryApi";

export default function AddCategoryForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) throw new Error("User email not found");

      const newCat = await addCategory({ name, email });
      onSuccess(newCat); // notify parent (Dashboard) to update list
      setName("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form className="d-flex gap-2 mb-3" onSubmit={handleSubmit}>
      <Form.Control
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit" variant="success" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </Button>
      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
    </Form>
  );
}
