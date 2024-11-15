import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const ScheduleFollowUp = ({ leadId }) => {
  const [scheduledAt, setScheduledAt] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const currentDate = new Date();
    const scheduledDate = new Date(scheduledAt);
  
    if (scheduledDate < currentDate) {
      toast.error("Scheduled date must be in the future.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/follow-ups",
        {
          lead_id: leadId,
          scheduled_at: scheduledAt,
          status,
        }
      );
  
      // Check if the response status is 201 (Created)
      if (response.status === 201) {
        toast.success("Follow-up scheduled successfully!");
      } else {
        toast.error("Error scheduling follow-up.");
      }
    } catch (error) {
      // Log the full error for better debugging
      console.log("Error while posting follow-up:", error.response || error);
      toast.error("Error scheduling follow-up.");
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
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Missed">Missed</option>
                </Form.Control>
              </Form.Group>

              <Button variant="danger" type="submit" className="w-100">
                Schedule Follow-Up
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ScheduleFollowUp;
