import React from 'react';
import { Button } from 'react-bootstrap';

const LeadsList = ({ leads, onSelectLead }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>
                <Button variant="success" onClick={() => onSelectLead(lead)}>
                  Follow Up
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsList;
