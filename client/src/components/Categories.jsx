import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { deleteCategory } from "../services/categoryApi";

export default function Categories({ categories = [], onCategoriesChange }) {
  const getCategoryColor = (name) => {
    const colors = ["#f44336", "#2196F3", "#4CAF50", "#FF9800", "#9C27B0", "#00BCD4"];
    const index = (categories || []).findIndex((c) => c.name === name);
    return colors[index % colors.length] || "#607D8B";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    await deleteCategory(id);
    onCategoriesChange((prev) => prev.filter((cat) => cat._id !== id));
  };

  if (!Array.isArray(categories) || categories.length === 0)
    return <p className="text-muted">No categories yet.</p>;

  return (
    <Row xs={1} md={3} className="g-3">
      {categories.map((cat) => (
        <Col key={cat._id}>
          <Card
            style={{
              backgroundColor: getCategoryColor(cat.name),
              color: "#fff",
              border: "none",
            }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <Card.Title className="m-0">{cat.name}</Card.Title>
              <Button
                variant="light"
                size="sm"
                onClick={() => handleDelete(cat._id)}
                style={{ fontWeight: "bold" }}
              >
                X
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
