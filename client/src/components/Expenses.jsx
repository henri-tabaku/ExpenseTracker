import { deleteExpense } from "../services/expenseApi";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function AllExpenses({ expenses = [], onExpensesChange }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await deleteExpense(id);
    onExpensesChange((prev) => prev.filter((exp) => exp._id !== id));
  };

  if (!expenses.length)
    return (
      <p className="text-center text-muted mt-3">
        No expenses yet — add your first one!
      </p>
    );

  return (
    <Row xs={1} md={2} lg={3} className="g-3 mt-2">
      {expenses.map((exp) => {
        console.log(exp);
        return (
        <Col key={exp._id}>
          <Card
            className="shadow-sm border-0 h-100"
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
            }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-1 fw-semibold">{exp.description}</Card.Title>
                <Card.Text className="text-muted mb-0">
                  ${exp.amount}
                  <br />
                  <small>{exp.category}</small>
                </Card.Text>
              </div>
              <Button
                variant="light"
                size="sm"
                onClick={() => handleDelete(exp._id)}
                style={{ borderRadius: "50%" }}
              >
                ✕
              </Button>
            </Card.Body>
          </Card>
        </Col>
      )})}
    </Row>
  );
}
