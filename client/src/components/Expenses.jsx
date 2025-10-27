import { deleteExpense } from "../services/expenseApi";
import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function AllExpenses({ expenses = [], categories = [], onExpensesChange }) {

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    await deleteExpense(id);
    onExpensesChange(prev => prev.filter(exp => exp._id !== id)); // update parent
  };

  if (!Array.isArray(expenses) || expenses.length === 0) return <p>No expenses yet</p>;

  return (
    <Row xs={1} md={4} className="g-3">
      {expenses.map((exp) => (
        <Col key={exp._id}>
          <Card style={{ backgroundColor: "grey", color: "#fff" }} className="d-flex flex-row">
            <Card.Body className=" justify-content-center align-items-center ">
              <div>
                <Card.Title>{exp.title}</Card.Title>
                <Card.Text>
                  ${exp.amount} <br />
                  <small>{exp.category}</small>
                </Card.Text>
              </div>
              <Button
                variant="light"
                size="sm"
                onClick={() => handleDelete(exp._id)}
                className="mt-auto"
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
