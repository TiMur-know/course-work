'use client'
import React, { useEffect, useState } from 'react';
import Plate from './plate';
import { Modal, Button, Form } from 'react-bootstrap';
import { useContext } from "react";
import { UserContext } from "../../userContext";
import axios from 'axios';
const Services=()=> {
  const {user}=useContext(UserContext);
  
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
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/services');
        const data =await response.json();
        setCosmetology(data.cosmetologyServices);
        setHairdressing(data.hairdressingServices)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])
  
  const handleAddService = async() => {
    try {
      const formData = new FormData();
      formData.append('name', newService.name);
      formData.append('description', newService.description);
      formData.append('price', newService.price);
      formData.append('gender', newService.gender);
      formData.append('type', newService.type);
      formData.append('photo', newService.photo);
      console.log(formData)
      const response = await axios.post('http://localhost:3001/api/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Response from server:', response.data);
      // Обновление состояния компонента или выполнение других действий после успешного добавления услуги
    } catch (error) {
      console.error('Error adding service:', error);
      // Обработка ошибки, например, отображение сообщения пользователю
    } finally {
      // Сброс формы и закрытие модального окна
      setNewService({ id: '', name: '', description: '', price: 0, photo: null, gender: '', type: 'cosmetology' });
      setShowModal(false);
    }
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

  const handleDelete = async(serviceId,type) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/services/${type}/${serviceId}`);
      console.log('Response from server:', response.data);
      // Обновление состояния компонента или выполнение других действий после успешного удаления услуги
    } catch (error) {
      console.error('Error deleting service:', error);
      // Обработка ошибки, например, отображение сообщения пользователю
    }
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