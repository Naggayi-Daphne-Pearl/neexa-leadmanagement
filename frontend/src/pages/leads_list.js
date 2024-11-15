import React from "react";

const LeadsList = () => {
  // Dummy data for leads
  const leads = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+1 234 567 890" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+1 234 567 891" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", phone: "+1 234 567 892" },
    { id: 4, name: "Alice Brown", email: "alice.brown@example.com", phone: "+1 234 567 893" },
  ];

  return (
    <div className="container my-5">
      {/* Page Title */}
      <h3 className="text-center mb-4 text-yellow">Leads List</h3>

      {/* Table of Leads */}
      <div className="table-responsive mb-5">
        <table className="table table-bordered table-striped table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alternatively, display leads in cards */}
      <div className="row justify-content-center">
        {leads.map((lead) => (
          <div key={lead.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card shadow-lg rounded">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">{lead.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {lead.email}
                  <br />
                  <strong>Phone:</strong> {lead.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsList;
