import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Não esqueça de importar o CSS do Bootstrap

const HomePage = () => {
  return (
    <Container>
      <Row className="justify-content-md-center" style={{ height: "100vh" }}> {/* Ajusta a altura para 100% da viewport */}
        <Col md="auto" className="my-auto"> {/* Centraliza verticalmente e horizontalmente */}
          <h1>Bem-vindo à Página Inicial!</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
