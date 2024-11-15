import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AppFooter = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5 style={{ color: "yellow" }}>Lead Management System</h5>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-right">
            <ul className="list-unstyled">
              <li>
                <a href="/leads-list" className="text-white" style={{ textDecoration: "none" }}>
                  Leads List
                </a>
              </li>
              <li>
                <a href="/schedule-follow-up" className="text-white" style={{ textDecoration: "none" }}>
                  Schedule Follow-Up
                </a>
              </li>
              <li>
                <a href="/update-follow-up-status" className="text-white" style={{ textDecoration: "none" }}>
                  Update Follow-Up Status
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;
