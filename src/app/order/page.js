"use client"
import React, { useState } from 'react';

const Order = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditClient,setCheckedClient] =useState(null);

  const services = [
    { id: 1, name: 'Услуга 1', description: 'Описание услуги 1' },
    { id: 2, name: 'Услуга 2', description: 'Описание услуги 2' },
    { id: 3, name: 'Услуга 3', description: 'Описание услуги 3' },
  ];

  const clients = [
    { id: 1, firstname: 'John', lastname: 'Doe', phone: '1234567890', age: 30, email: 'john@example.com' },
    { id: 2, firstname: 'Jane', lastname: 'Smith', phone: '9876543210', age: 25, email: 'jane@example.com' },
    { id: 3, firstname: 'Bob', lastname: 'Johnson', phone: '5555555555', age: 35, email: 'bob@example.com' },
  ];
  const getData=()=>{
    
  }
  const handleServiceChange = (serviceId) => {
    const selectedService = services.find(service => service.id === serviceId);
    setSelectedService(selectedService);
  };

  const handleClientChange = (clientId) => {
    const selectedClient = clients.find(client => client.id === clientId);
    setSelectedClient(selectedClient);
  };
  const handleClientEditChange=(e)=>{

    setCheckedClient(e.target.checked);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2 >Услуги</h2>
          <select className="form-select" onChange={(e) => handleServiceChange(parseInt(e.target.value))}>
            <option value="">Выберите услугу</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name} {service.price}</option>
            ))}
          </select>
          <hr/>
          {selectedService && (
            <div>
              <h4>Выбранная услуга:</h4>
              <div className='col-sm-6'>Фото: {selectedService.photo}</div>
              <div className='col-sm-6'>Название: {selectedService.name}</div>
              <div className='col-sm-6'>Описание: {selectedService.description}</div>
              <div className='col-sm-6'>Цена: {selectedService.price}</div>
                {selectedService.gender &&(
              <div className='col-sm-6'>Стать: {selectedService.gender}</div>
              )}
              </div>
          )}
        </div>
        <div className="col-6">
          <h2>Клиенты</h2>
          
          <select className="form-select" onChange={(e) => handleClientChange(parseInt(e.target.value))}>
            <option value="">Выберите клиента</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.lastname} {client.firstname}</option>
            ))}
          </select>
          <input type="checkbox" className="btn-check" id="btn-check-outlined2" checked={isEditClient} autocomplete="off" onChange={handleClientEditChange}/>
          <label className="btn btn-outline-primary" for="btn-check-outlined2">Edit Mode</label>
          <hr/>
          {selectedClient && !isEditClient && (
            <div>
              <h4>Выбранный клиент:</h4>

              <div className='col-sm-6'>Фамилия: {selectedClient.lastname}</div>
              <hr/>
              <div className='col-sm-6'>Имя: {selectedClient.firstname}</div>
              <hr/>
              <div className='col-sm-6'>Возраст: {selectedClient.age}</div>
              <hr/>
              <div className='col-sm-6'>Email: {selectedClient.email}</div>
              <hr/>
              <div className='col-sm-6'>Телефон: {selectedClient.phone}</div>
            </div>
          )}
          {isEditClient && (
            <div>
                <div className='col-sm-6'>
                    <label for="lastname" className='form-label'>Фамилия</label>
                    <input type="text" className='form-control' id='lastname'/>
                    <div className='invalid-feedback'>Впишите коректную фамилию</div>
                </div>
                <hr/>
                <div className='col-sm-6'>
                    <label for="firstname" className='form-label'>Имя</label>
                    <input type="text" className='form-control' id='firstname'/>
                    <div className='invalid-feedback'>Впишите коректное имя</div>
                </div>
                <hr/>
                <div className='col-sm-6'>
                    <label for="age" className='form-label'>Возраст</label>
                    <input type="text" className='form-control' id='age'/>
                    <div className='invalid-feedback'>Впишите коректный возраст</div>
                </div>
                <hr/>
                <div className='col-sm-6'>
                    <label for="email" className='form-label'>Email</label>
                    <input type="text" className='form-control' id='email'/>
                </div>
                <hr/>
                <div className='col-sm-6'>
                    <label for="firstname" className='form-label'>Телефон</label>
                    <input type="text" className='form-control' id='firstname'/>
                    <div className='invalid-feedback'>Впишите коректный номер телефона</div>
                </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
