// FollowUpList.js
import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Alert } from 'react-bootstrap';
import UpdateFollowUpStatus from './update_followup';

const FollowUpList = ({ user }) => {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const fetchFollowUps = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/follow-ups');
      const data = await response.json();
      setFollowUps(data);
    };

    fetchFollowUps();
  }, []);

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">Follow-Ups (Role: {user.role})</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Scheduled Time</th>
            <th>Status</th>
            {user.role === 'Admin' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {followUps.map((followUp) => (
            <tr key={followUp.id}>
              <td>{new Date(followUp.scheduled_at).toLocaleString()}</td>
              <td>{followUp.status}</td>
              {user.role === 'Admin' ? (
                <td>
                  <UpdateFollowUpStatus
                    followUpId={followUp.id}
                    currentStatus={followUp.status}
                    onUpdate={(newStatus) => {
                      setFollowUps((prevFollowUps) =>
                        prevFollowUps.map((fu) =>
                          fu.id === followUp.id ? { ...fu, status: newStatus } : fu
                        )
                      );
                    }}
                  />
                </td>
              ) : (
                <td>
                  {user.role === 'Sales Manager' ? (
                    <Alert variant="warning">View Only</Alert>
                  ) : (
                    <Alert variant="danger">No Access</Alert>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FollowUpList;
