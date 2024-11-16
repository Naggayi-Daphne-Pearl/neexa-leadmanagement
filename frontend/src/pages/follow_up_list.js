import React, { useEffect, useState } from "react";
import { Button, Table, Container, Alert } from "react-bootstrap";
import UpdateFollowUpStatus from "./update_followup";

const FollowUpList = ({ user }) => {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/follow-ups");
        const data = await response.json();
        setFollowUps(data);
      } catch (error) {
        console.error("Error fetching follow-ups:", error);
      }
    };

    fetchFollowUps();
  }, []);

  // Check if an appointment is missed (either in the future or completed)
  const isMissedAppointment = (scheduledAt, status) => {
    const now = new Date();
    return new Date(scheduledAt) > now && status !== "Completed"; // If scheduled time is later, mark as missed
  };

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">Follow-Ups (Role: {user.role})</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Scheduled Time</th>
            <th>Status</th>
            {user.role === "Admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {followUps.map((followUp) => {
            const missed = isMissedAppointment(
              followUp.scheduled_at,
              followUp.status
            );
            return (
              <tr
                key={followUp.id}
                style={{
                  backgroundColor: missed ? "red" : "transparent",
                  color: missed ? "white" : "inherit",
                }}
              >
                <td>{new Date(followUp.scheduled_at).toLocaleString()}</td>
                <td
                  style={{
                    color: missed ? "white" : "inherit",
                    backgroundColor: missed ? "red" : "transparent",
                  }}
                >
                  {missed ? "User missed appointment" : followUp.status}
                </td>
                {user.role === "Admin" ? (
                  <td>
                    <UpdateFollowUpStatus
                      followUpId={followUp.id}
                      currentStatus={followUp.status}
                      onUpdate={(newStatus) => {
                        setFollowUps((prevFollowUps) =>
                          prevFollowUps.map((fu) =>
                            fu.id === followUp.id
                              ? { ...fu, status: newStatus }
                              : fu
                          )
                        );
                      }}
                    />
                  </td>
                ) : (
                  <td>
                    {user.role === "Sales Manager" ? (
                      <Alert variant="warning">View Only</Alert>
                    ) : (
                      <Alert variant="danger">No Access</Alert>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default FollowUpList;
