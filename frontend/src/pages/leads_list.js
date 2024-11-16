import React from 'react';
import { Button, Table, Container } from 'react-bootstrap';

const LeadsList = ({ leads, onSelectLead }) => {
  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">Leads List</h3>
      <Table striped bordered hover responsive>
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
      </Table>
    </Container>
  );
};

export default LeadsList;
