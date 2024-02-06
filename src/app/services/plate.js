
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Plate = ({type,service, onEdit, onDelete, isAdmin=false }) => {
  const { id, name, description, photo, price, gender } = service;

  const handleEdit = () => {
    onEdit(id,type);
  };

  const handleDelete = () => {
    onDelete(id,type);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img width={250} height={200} variant="top" src={photo!=null? (`http://localhost:3001${photo}`):"../non-image.png"} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text className=''>Ціна: ${price}</Card.Text>
        <Card.Text>{description}</Card.Text>
        {gender && <Card.Text>Стать: {gender}</Card.Text>}
        {isAdmin && (
          <div className="d-flex justify-content-between">
            <Button variant="info" onClick={handleEdit}>
              Змінити
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Видалити
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Plate;