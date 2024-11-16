// components/Login.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import users from '../../data/users';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="shadow-lg p-4 rounded bg-white">
            <h3 className="text-center mb-4">Login</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={handleLogin}
                className="w-100"
              >
                Login
              </Button>
            </Form>

            <div className="mt-4">
              <h5>Test Users </h5>
              <ul className="list-unstyled">
                {users.map((user, index) => (
                  <li key={index} className="mb-1">
                    <strong>Email:</strong> {user.email} | <strong>Password:</strong> {user.password}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
