// components/MainPage.js
import React, { useState, useEffect } from "react";
import LeadsList from "./leads_list";
import FollowUpList from "./follow_up_list";
import ScheduleFollowUp from "./follow_up";
import CreateLeadForm from "./leads_form";
import { Modal, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MainPage = ({ user, onLogout }) => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/leads");
        if (!response.ok) {
          throw new Error("Failed to fetch leads");
        }
        const data = await response.json();
        setLeads(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleCreateLead = (newLead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]);
    setIsModalOpen(false);
  };

  const handleSelectLead = (lead) => {
    if (user.role === "Admin") {
      setSelectedLead(lead);
      setIsModalOpen(true);
    } else {
      alert("Only admins can schedule follow-ups.");
    }
  };

  const handleScheduleFollowUp = async (scheduledAt, status) => {
    if (selectedLead && user.role === "Admin") {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/follow-ups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lead_id: selectedLead.id,
            scheduled_at: scheduledAt,
            status: status,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to schedule follow-up");
        }

        const followUp = await response.json();
        setSelectedLead((prevLead) => ({
          ...prevLead,
          followUps: [...(prevLead.followUps || []), followUp],
        }));
      } catch (error) {
        setError(error.message);
      }
    } else {
      alert("Only admins can schedule follow-ups.");
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Welcome, {user.email}</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleLogout} className="mx-2">
            Logout
          </Button>
          {user.role === "Admin" && (
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="mx-2"
            >
              Create Lead
            </Button>
          )}
        </Col>
      </Row>
      {user.role !== "Admin" && (
        <Row className="mb-4">
          <Col>
            <Alert variant="warning" className="text-center">
              Only admins can create leads and follow-ups.
            </Alert>
          </Col>
        </Row>
      )}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedLead ? "Schedule Follow-Up" : "Create New Lead"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLead ? (
            <ScheduleFollowUp
              leadId={selectedLead.id}
              onSchedule={handleScheduleFollowUp}
            />
          ) : (
            <CreateLeadForm onCreate={handleCreateLead} />
          )}
        </Modal.Body>
      </Modal>
      <Row>
        <Col>
          {loading ? (
            <p className="text-center">Loading leads...</p>
          ) : error ? (
            <Alert variant="danger" className="text-center">
              Error: {error}
            </Alert>
          ) : (
            <LeadsList leads={leads} onSelectLead={handleSelectLead} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <FollowUpList user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
