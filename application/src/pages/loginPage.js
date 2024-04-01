import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import axios from "axios";

const LoginPage = () => {
  const [user, setUser] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/login", { user })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
