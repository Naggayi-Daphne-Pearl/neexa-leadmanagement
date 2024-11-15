import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const UpdateFollowUpStatus = ({ followUpId, currentStatus, onUpdate }) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/follow-ups/${followUpId}/status`,
        { status }
      );

      if (response.status === 200) {
        onUpdate(response.data.status); // Update the status in the parent component
        handleClose(); // Close the modal
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>Update Status</Button>

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
            <Button variant="primary" type="submit" className='my-5'>
              Update Status
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateFollowUpStatus;
