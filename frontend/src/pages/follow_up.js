import React from "react";
import { Table, Badge } from "react-bootstrap";

const FollowUpList = () => {
  // Dummy data for follow-ups
  const followUps = [
    { id: 1, lead_id: 101, scheduled_at: "2024-11-15 10:00", status: "Pending" },
    { id: 2, lead_id: 102, scheduled_at: "2024-11-16 14:30", status: "Completed" },
    { id: 3, lead_id: 103, scheduled_at: "2024-11-17 09:00", status: "Missed" },
    { id: 4, lead_id: 104, scheduled_at: "2024-11-18 16:00", status: "Pending" },
  ];

  // Render the follow-up list
  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Follow-Up List</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Follow-Up ID</th>
            <th>Lead ID</th>
            <th>Scheduled At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {followUps.map((followUp) => (
            <tr key={followUp.id}>
              <td>{followUp.id}</td>
              <td>{followUp.lead_id}</td>
              <td>{followUp.scheduled_at}</td>
              <td>
                {/* Render the status with appropriate color */}
                <Badge
                  bg={
                    followUp.status === "Pending"
                      ? "warning"
                      : followUp.status === "Completed"
                      ? "success"
                      : "danger"
                  }
                >
                  {followUp.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FollowUpList;
