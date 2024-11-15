import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Initialize Pusher and Echo
window.Pusher = Pusher;

const UpdateFollowUpStatus = ({ followUpId, currentStatus, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const echo = new Echo({
      broadcaster: "pusher",
      key: "your-pusher-key",  // Replace with your actual Pusher key
      cluster: "your-cluster", // Replace with your actual Pusher cluster
      encrypted: true,
    });

    // Listen for FollowUpStatusChanged event
    const channel = echo.channel("follow-ups");

    channel.listen("FollowUpStatusChanged", (event) => {
      console.log("FollowUp Status Changed:", event);
      if (event.followUp.id === followUpId) {
        setStatus(event.followUp.status);
      }
    });

    return () => {
      channel.stopListening("FollowUpStatusChanged");
    };
  }, [followUpId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/follow-ups/${followUpId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      const updatedFollowUp = await response.json();
      onUpdate(updatedFollowUp.status);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Update Status
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Follow-Up Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="status">
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
            <Button variant="primary" type="submit" className="my-5">
              Update Status
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateFollowUpStatus;
