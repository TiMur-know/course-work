'use client'
import React, { useEffect, useState } from 'react';
import Plate from './plate';
import { Modal, Button, Form } from 'react-bootstrap';
const Services=()=> {
  useEffect(()=>{
    const fetchData = async () => {
      try {
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])
  const user = { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1', role: 'ADMIN' };
  let isAdmin=user.role==='ADMIN'
  const cosmetologyData = [
    { id: 1, name: 'Facial Treatment', description: 'Lorem ipsum dolor sit amet.', photo: '/images/facial-treatment.jpg',  price: 50 },
    { id: 2, name: 'Manicure', description: 'Lorem ipsum dolor sit amet.', photo: '/images/manicure.jpg',  price: 25 },
    { id: 3, name: 'Pedicure', description: 'Lorem ipsum dolor sit amet.', photo: '/images/pedicure.jpg',  price: 30 },
  ];

  const hairdressingData = [
    { id: 1, name: 'Haircut', description: 'Lorem ipsum dolor sit amet.', photo: '/images/haircut.jpg', price: 35,  gender: 'Unisex' },
    { id: 2, name: 'Hair Coloring', description: 'Lorem ipsum dolor sit amet.', photo: '/images/hair-coloring.jpg',  price: 60, gender: 'Unisex' },
    { id: 3, name: 'Hair Styling', description: 'Lorem ipsum dolor sit amet.', photo: '/images/hair-styling.jpg',  price: 40, gender: 'Unisex' },
  ];
  const [cosmetology, setCosmetology] = useState(cosmetologyData);
  const [hairdressing, setHairdressing] = useState(hairdressingData);
  const [showModal, setShowModal] = useState(false);
  const [newService, setNewService] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    photo: null,
    gender:'',
    type: 'cosmetology', // Default type to cosmetology
  });
  const handleAddService = () => {
    // Обработчик добавления/изменения услуги
    // Можно отправить новую услугу на сервер или обновить состояние в компоненте
    // В данном примере, новая услуга просто выводится в консоль
    const serviceToAdd = { ...newService };
    const serviceArray = serviceToAdd.type === "cosmetology" ? [...cosmetology] : [...hairdressing];

    if (serviceToAdd.id) {
      // If the service ID exists, it means we are updating an existing service
      const index = serviceArray.findIndex((service) => service.id === serviceToAdd.id);
      if (index !== -1) {
        // If the service is found in the array, update it
        serviceArray[index] = serviceToAdd;
      } else {
        console.log("Service not found with ID:", serviceToAdd.id);
      }
    } else {
      // If the service ID does not exist, it means we are adding a new service
      const newId = serviceArray.length + 1;
      serviceToAdd.id = newId;
      serviceArray.push(serviceToAdd);
    }

    console.log('New service:', serviceToAdd);
    if (serviceToAdd.type === "cosmetology") {
      setCosmetology(serviceArray);
    } else {
      // Устанавливаем значение "gender" только для услуг типа "hairdressing"
      const updatedHairdressing = serviceArray.map((service) =>
        service.type === "hairdressing" ? { ...service, gender: newService.gender } : service
      );
      setHairdressing(updatedHairdressing);
    }
    // Сброс формы и закрытие модального окна
    setNewService({ id: "", name: "", description: "", price: 0, photo: null,gender:'',  type: "cosmetology" });
    setShowModal(false);
  };

  const handleEdit = (serviceId,type) => {
    // Implement edit functionality here or simply console log the serviceId
    let serviceToEdit;
    if(type==='cosmetology'){
      serviceToEdit = cosmetology.find((service) => service.id === serviceId);
    }else if(type=== 'hairdressing'){
      serviceToEdit = hairdressing.find((service) => service.id === serviceId);
    }
    console.log(`Edit service with ID: ${serviceId}, Type: ${type}`);
    setNewService({
      id: serviceToEdit.id,
      name: serviceToEdit.name,
      description: serviceToEdit.description,
      price: serviceToEdit.price,
      photo: serviceToEdit.photo,
      type,
      gender: serviceToEdit.type === "hairdressing" ? serviceToEdit.gender : "",
    });
    setShowModal(true);
  };

  const handleDelete = (serviceId,type) => {
    // Implement delete functionality here or simply console log the serviceId
    if (type === 'cosmetology') {
      setCosmetology((prevCosmetology) => prevCosmetology.filter((service) => service.id !== serviceId));
    } else if (type === 'hairdressing') {
      setHairdressing((prevHairdressing) => prevHairdressing.filter((service) => service.id !== serviceId));
    }
    console.log(type)
    console.log(`Delete service with ID:`, serviceId);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewService({ ...newService, photo: file });
  };

    return (
      <div className='container'>
      <h1 style={{color:'#05a9e5'}}>Послуги</h1>
      {user.role === 'ADMIN' && (
        <div className="mb-3">
          <Button variant="info" onClick={() => setShowModal(true)}>
            Добавити послугу
          </Button>
        </div>
      )}
      {user.role!=='HAIRDRESSER'&&(<div>
        <h2 style={{color:'#1785b6'}}>Косметологічні послуги</h2>
        <div className="d-flex gap-2">
          {cosmetology.map(service => (
            <Plate key={service.id} 
            type="cosmetology"
            service={service} 
            isAdmin={isAdmin} 
            onEdit={handleEdit}
            onDelete={handleDelete}
                />
          ))}
        </div>
      </div>)}
      
      {user.role!=='BEAUTICIAN'&&(<div >
        <h2 style={{color:'#1785b6'}}>Перукарські послуги</h2>
        <div className="d-flex gap-2">
          {hairdressing.map(service => (
            <Plate key={service.id} 
            type="hairdressing"
            service={service} 
            isAdmin={isAdmin} 
            onEdit={handleEdit}
            onDelete={handleDelete}
                />
          ))}
        </div>
      </div>)}
      {/* Модальное окно для добавления/изменения услуги */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{newService.id ? 'Змінити послуги' : 'Добавити послуги'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="serviceName">
              <Form.Label>Назва послуги</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введіть назву послуги"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              />
            </Form.Group>
            {newService.id ?<div></div>:<Form.Group controlId="serviceType">
              <Form.Label>Тип услуги</Form.Label>
              <Form.Control
                as="select"
                value={newService.type}
                onChange={(e) => setNewService({ ...newService, type: e.target.value })}
              >
                <option value="cosmetology">Косметологія</option>
                <option value="hairdressing">Перукарня</option>
              </Form.Control>
            </Form.Group>}
            <Form.Group controlId="serviceGender">
              <Form.Label>Для якоъ статі</Form.Label>
              <Form.Control
                as="select"
                value={newService.gender}
                onChange={(e) => setNewService({ ...newService, gender: e.target.value })}
                disabled={newService.type !== "hairdressing"}
              >
                <option value="">Не вказано</option>
                <option value="Unisex">Унісекс</option>
                <option value="Male">Чоловіки</option>
                <option value="Female">Жінки</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="serviceDescription">
              <Form.Label>Опис послуги</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Введіть опис послуги"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="servicePrice">
              <Form.Label>Вартість послуги</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введить вартість послуги"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="servicePhoto">
              <Form.Label>Фото послуги</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileUpload} />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="info" onClick={handleAddService}>
            {newService.id ? 'Змінити' : 'Добавити'}
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Відміна
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
      
    )
  }
export default Services