import React, { useState, useEffect } from "react";
import LeadsList from "./leads_list";
import FollowUpList from "./follow_up_list";
import ScheduleFollowUp from "./follow_up";
import CreateLeadForm from "./leads_form";
import { Modal, Button } from "react-bootstrap";

const MainPage = ({ user }) => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleSelectLead = (lead) => {
    setSelectedLead(lead);
    if (user.role === 'Admin') {
      setIsModalOpen(true);
    }
  };

  const handleScheduleFollowUp = async (scheduledAt, status) => {
    if (selectedLead) {
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
    }
  };

  return (
    <div className="container my-5">
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Create Lead
      </Button>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedLead ? "Schedule Follow-Up" : "Create New Lead"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLead ? (
            <ScheduleFollowUp leadId={selectedLead.id} onSchedule={handleScheduleFollowUp} />
          ) : (
            <CreateLeadForm onCreate={handleCreateLead} />
          )}
        </Modal.Body>
      </Modal>

      {loading ? (
        <p>Loading leads...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <LeadsList leads={leads} onSelectLead={handleSelectLead} />
      )}
      <FollowUpList user={user} />
    </div>
  );
};

export default MainPage;
