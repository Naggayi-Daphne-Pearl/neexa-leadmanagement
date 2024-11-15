import React, { useState, useEffect } from "react";
import LeadsList from "./pages/leads_list";
import FollowUpList from "./pages/follow_up_list";
import ScheduleFollowUp from "./pages/follow_up";
import UpdateFollowUpStatus from "./pages/follow_up_status.list";
import CreateLeadForm from "./pages/leads_form";

const App = () => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);     

  // Fetch leads from API when component mounts
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
  };

  const handleSelectLead = (lead) => {
    setSelectedLead(lead);
  };

  const handleUpdateFollowUpStatus = async (followUpId, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/follow-ups`, {
        method: "PUT", // Assuming you use PUT for updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update follow-up status");
      }
  
      const updatedFollowUp = await response.json();
  
      // Optionally update the selectedLead's followUps with the updated status
      setSelectedLead((prevLead) => ({
        ...prevLead,
        followUps: prevLead.followUps.map((followUp) =>
          followUp.id === followUpId ? updatedFollowUp : followUp
        ),
      }));
    } catch (error) {
      setError(error.message);
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
        // Optionally update selectedLead with the new follow-up data
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
    <div>
      <CreateLeadForm onCreate={handleCreateLead} />
      
      {loading ? (
        <p>Loading leads...</p> // Show loading message
      ) : error ? (
        <p>Error: {error}</p> // Show error message if there's an issue
      ) : (
        <LeadsList leads={leads} onSelectLead={handleSelectLead} />
      )}

      {selectedLead && (
        <div>
          <FollowUpList leadId={selectedLead.id} />
          <ScheduleFollowUp
            leadId={selectedLead.id}
            onSchedule={handleScheduleFollowUp}
          />
          {selectedLead.followUps && selectedLead.followUps.length > 0 && (
            <UpdateFollowUpStatus
              followUpId={selectedLead.followUps[0].id}
              onUpdate={handleUpdateFollowUpStatus}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
