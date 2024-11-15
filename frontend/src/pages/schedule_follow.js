import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const ScheduleFollowUp = ({ leadId }) => {
  const [scheduledAt, setScheduledAt] = useState("");
  const [status, setStatus] = useState("Pending");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leadId || !email || !scheduledAt) {
      toast.error("All fields are required.");
      return;
    }

    const currentDate = new Date();
    const scheduledDate = new Date(scheduledAt);

    if (scheduledDate < currentDate) {
      toast.error("Scheduled date must be in the future.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/follow-ups",
        {
          lead_id: leadId,
          scheduled_at: scheduledAt,
          status,
        }
      );

      toast.success("Follow-up scheduled successfully!");
    } catch (error) {
      toast.error("Error scheduling follow-up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="p-4 shadow-lg bg-white rounded">
            <h3 className="text-center mb-4">Schedule Follow-Up</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="scheduledAt" className="mb-3">
                <Form.Label>Scheduled At</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="status" className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Missed">Missed</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Schedule Follow-Up"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ScheduleFollowUp;


