import React from 'react';
import { Button } from 'react-bootstrap';

const LeadsList = ({ leads, onSelectLead }) => {
  return (
    <div>
      <h3>Leads List</h3>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            <span>{lead.name}</span>
            <Button onClick={() => onSelectLead(lead)}>Add Follow-Up</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadsList;
