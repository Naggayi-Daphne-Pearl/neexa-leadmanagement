import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const ScheduleFollowUp = ({ userRole }) => {
  // Initial state
  const [leadId, setLeadId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [status, setStatus] = useState("Pending");
  const [email, setEmail] = useState("");

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
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

    try {
      // Send data to API (assumes API endpoint exists)
      const response = await axios.post("/api/follow-ups", {
        lead_id: leadId,
        email,
        scheduled_at: scheduledAt,
        status
      });
      toast.success("Follow-up scheduled successfully!");
    } catch (error) {
      toast.error("Error scheduling follow-up.");
    }
  };

  return (
    <div className="bg-dark">
    <Container className="my-5 ">
      <Row className="align-items-center">
        {/* Form Section with Box Shadow */}
        <Col md={6} className="h-100" >
          <div className="p-4 shadow-lg h-100 bg-white">
            <p className="text-center mb-4 text-sm text-gray">Schedule Follow-Up</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="leadId" className="my-4">
                <Form.Control
                  type="text"
                  placeholder="Enter Lead ID"
                  value={leadId}
                  onChange={(e) => setLeadId(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="my-4">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="scheduledAt" className="my-4">
                <Form.Control
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="status" className="my-4">
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

              <Button variant="dark" type="submit" className="w-100">
                Schedule Follow-Up
              </Button>
            </Form>
          </div>
        </Col>

        {/* Image Section */}
        <Col md={6} className="text-center">
          <img
            src="/signupimage.png"  // Replace with your image URL
            alt="Schedule Follow-Up"
            className="img-fluid rounded shadow-lg"
          />
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ScheduleFollowUp;
