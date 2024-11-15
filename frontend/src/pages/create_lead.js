import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const CreateLead = ({ onCreate }) => {
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Follow-up scheduled successfully!");
      onCreate(data); // Pass the new lead data to the parent component
      setLeadData({ name: "", email: "", phone: "" }); // Reset form
    } else {
      toast.error("Error scheduling follow-up.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={leadData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={leadData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={leadData.phone}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" className="container my-5">
        Create Lead
      </Button>
    </Form>
  );
};

export default CreateLead;
