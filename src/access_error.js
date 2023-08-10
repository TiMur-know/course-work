import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Link from 'next/link';

const AccessErrorPage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="text-center">
            <h1 className="display-4">Страница недоступна</h1>
            <p className="lead">Вы не имеете доступа к этой странице.</p>
            <p>Пожайлуста свяжытесь с администрацией.</p>
            <Link href="/">
              <Button variant="primary">К главной странице</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessErrorPage;