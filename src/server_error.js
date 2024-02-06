import React from 'react';
import { Alert } from 'react-bootstrap';

const ServerError = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Alert variant="danger">
        <Alert.Heading>Сервер не включен или по другой причине </Alert.Heading>
        <Alert.Heading> не может передать данные</Alert.Heading>
        <p>
          Пожалуйста, обратитесь к администратору за помощью.
        </p>
      </Alert>
    </div>
  );
};

export default ServerError;