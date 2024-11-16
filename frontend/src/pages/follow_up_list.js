import React, { useEffect, useState } from "react";
import { Button, Table, Container, Alert } from "react-bootstrap";
import UpdateFollowUpStatus from "./update_followup";

const FollowUpList = ({ user }) => {
  const [followUps, setFollowUps] = useState([]);
  const [leads, setLeads] = useState({});

  // Fetch follow-ups and leads
  useEffect(() => {
    const fetchFollowUps = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/follow-ups");
        const data = await response.json();
        setFollowUps(data);
        fetchLeads(); // Fetch leads after fetching follow-ups
      } catch (error) {
        console.error("Error fetching follow-ups:", error);
      }
    };

    const fetchLeads = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/leads");
        const data = await response.json();
        const leadsMap = data.reduce((acc, lead) => {
          acc[lead.id] = lead.name;
          return acc;
        }, {});
        setLeads(leadsMap);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchFollowUps();
  }, []);

  // Check if an appointment is missed
  const isMissedAppointment = (scheduledAt, status) => {
    const now = new Date();
    return new Date(scheduledAt) < now && status !== "Completed";
  };

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">Follow-Ups</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Lead Name</th>
            <th>Scheduled Time</th>
            <th>Status</th>
            {user.role === "Admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {followUps.map((followUp) => {
            const missed = isMissedAppointment(followUp.scheduled_at, followUp.status);
            const leadName = leads[followUp.lead_id] || "Loading...";

            return (
              <tr
                key={followUp.id}
                style={{
                  backgroundColor: missed ? "red" : "transparent",
                  color: missed ? "white" : "inherit",
                }}
              >
                <td>{leadName}</td>
                <td>{new Date(followUp.scheduled_at).toLocaleString()}</td>
                <td
                  style={{
                    color: missed ? "white" : "inherit",
                    backgroundColor: missed ? "red" : "transparent",
                  }}
                >
                  {missed ? "User missed Follow Up" : followUp.status}
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
