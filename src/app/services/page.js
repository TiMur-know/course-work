'use client'
import React, { useState } from 'react';
import Plate from './plate';
import { Modal, Button, Form } from 'react-bootstrap';
const Services=()=> {
  const user = { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1', role: 'ADMIN' };
  let isAdmin=user.role==='ADMIN'
  const cosmetology = [
    { id: 1, name: 'Facial Treatment', description: 'Lorem ipsum dolor sit amet.', photo: '/images/facial-treatment.jpg', price: 50 },
    { id: 2, name: 'Manicure', description: 'Lorem ipsum dolor sit amet.', photo: '/images/manicure.jpg', price: 25 },
    { id: 3, name: 'Pedicure', description: 'Lorem ipsum dolor sit amet.', photo: '/images/pedicure.jpg', price: 30 },
  ];

  const hairdressing = [
    { id: 1, name: 'Haircut', description: 'Lorem ipsum dolor sit amet.', photo: '/images/haircut.jpg', price: 35, gender: 'Unisex' },
    { id: 2, name: 'Hair Coloring', description: 'Lorem ipsum dolor sit amet.', photo: '/images/hair-coloring.jpg', price: 60, gender: 'Unisex' },
    { id: 3, name: 'Hair Styling', description: 'Lorem ipsum dolor sit amet.', photo: '/images/hair-styling.jpg', price: 40, gender: 'Unisex' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({ id: '', name: '', description: '', price: 0, photo: null });

  const handleAddService = () => {
    // Обработчик добавления/изменения услуги
    // Можно отправить новую услугу на сервер или обновить состояние в компоненте
    // В данном примере, новая услуга просто выводится в консоль
    console.log('New service:', newService);

    // Сброс формы и закрытие модального окна
    setNewService({ id: '', name: '', description: '', price: 0, photo: null });
    setShowModal(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewService({ ...newService, photo: file });
  };

    return (
      <div className='container'>
      <h1>Услуги</h1>
      {user.role === 'ADMIN' && (
        <div className="mb-3">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Добавить услугу
          </Button>
        </div>
      )}
      {user.role!=='HAIRDRESSER'&&(<div>
        <h2>Косметологические услуги</h2>
        <div className="d-flex">
          {cosmetology.map(service => (
            <Plate key={service.id} service={service} isAdmin={isAdmin} />
          ))}
        </div>
      </div>)}
      
      {user.role!=='BEAUTICIAN'&&(<div>
        <h2>Перукарськие услуги</h2>
        <div className="d-flex">
          {hairdressing.map(service => (
            <Plate key={service.id} service={service} isAdmin={isAdmin}/>
          ))}
        </div>
      </div>)}
      {/* Модальное окно для добавления/изменения услуги */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{newService.id ? 'Изменить услугу' : 'Добавить услугу'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="serviceName">
              <Form.Label>Название услуги</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название услуги"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="serviceDescription">
              <Form.Label>Описание услуги</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Введите описание услуги"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="servicePrice">
              <Form.Label>Стоимость услуги</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите стоимость услуги"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="servicePhoto">
              <Form.Label>Изображение услуги</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileUpload} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleAddService}>
            {newService.id ? 'Изменить' : 'Добавить'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
      
    )
  }
export default Services