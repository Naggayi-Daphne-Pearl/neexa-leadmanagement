import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import UpdateFollowUpStatus from './update_followup';

const FollowUpList = () => {
  const [followUps, setFollowUps] = useState([]);
  const [userRole, setUserRole] = useState('Sales Rep'); // Default role

  useEffect(() => {
    const fetchFollowUps = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/follow-ups');
      const data = await response.json();
      setFollowUps(data);
    };

    fetchFollowUps();
  }, []);

  const switchRole = () => {
    setUserRole((prevRole) => {
      if (prevRole === 'Sales Rep') return 'Sales Manager';
      if (prevRole === 'Sales Manager') return 'Admin';
      return 'Sales Rep';
    });
  };

  return (
    <div>
      <h3>Follow-Ups</h3>
      <Button onClick={switchRole} className="mb-3">
        Switch Role (Current: {userRole})
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Scheduled Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {followUps.map((followUp) => (
            <tr key={followUp.id}>
              <td>{new Date(followUp.scheduled_at).toLocaleString()}</td>
              <td>{followUp.status}</td>
              <td>
                {(userRole === 'Admin' || userRole === 'Sales Manager') && (
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
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FollowUpList;
