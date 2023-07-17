
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Plate = ({ service, onEdit, onDelete, isAdmin }) => {
  const { id, name, description, photo, price, gender } = service;

  const handleEdit = () => {
    onEdit(id);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={photo} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Price: ${price}</Card.Text>
        {gender && <Card.Text>Gender: {gender}</Card.Text>}
        {isAdmin && (
          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleEdit}>
              Изменить
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Удалить
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Plate;