import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const UpdateFollowUpStatus = ({ followUpId, onUpdate }) => {
  const [status, setStatus] = useState('Pending');

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/api/followups/${followUpId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      onUpdate(status);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Status:</label>
      <select value={status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Missed">Missed</option>
      </select>
      <Button type="submit">Update Status</Button>
    </form>
  );
};

export default UpdateFollowUpStatus;
