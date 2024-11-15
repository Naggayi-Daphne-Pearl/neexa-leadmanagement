import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // For navigation between pages

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span style={{ color: "yellow" }}>Lead Management</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/leads-list" className="text-white">
              Leads List
            </Nav.Link>
            <Nav.Link as={Link} to="/schedule-follow-up" className="text-white fontSize-sm">
              Schedule Follow-Up
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/update-follow-up-status"
              className="text-white"
            >
              Update Follow-Up Status
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
