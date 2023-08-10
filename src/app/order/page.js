"use client"
import React, { useState,useEffect } from 'react';
import withAuthorization  from '../../authControl'
import { useContext } from "react";
import { UserContext } from "../../userContext";
import axios from 'axios';
const Order = () => {
  const {user}=useContext(UserContext);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditClient, setEditClient] = useState(null);
  const [isAddClient,setAddClient]=useState(false)

  const initialServices = [
    { id: 1, name: 'Услуга 1',type:"h", description: 'Описание услуги 1' },
    { id: 2, name: 'Услуга 2',type:"h", description: 'Описание услуги 2' },
    { id: 3, name: 'Услуга 3',type:"c", description: 'Описание услуги 3' },
  ];

  const initialClients = [
    { id: 1, firstname: 'John', lastname: 'Doe', phone: '1234567890', age: 30, email: 'john@example.com' },
    { id: 2, firstname: 'Jane', lastname: 'Smith', phone: '9876543210', age: 25, email: 'jane@example.com' },
    { id: 3, firstname: 'Bob', lastname: 'Johnson', phone: '5555555555', age: 35, email: 'bob@example.com' },
  ];
  const [clients, setClients] = useState(initialClients);
  const [services, setServices] = useState(initialServices);
  useEffect(()=>{
    async function fetchData(){
      try {
        const responseClients = await axios.get('http://localhost:3001/api/clients');
        setClients(responseClients.data);

        const responseServices = await axios.get('http://localhost:3001/api/services');
        let servicesData;
        if(user.role=="HAIRDRESSER"){
          let data = responseServices.data.hairdressingServices.map(service => ({
            ...service,
            type: 'Перукарня'
          }));
          servicesData = [...data];
        }
        else if(user.role=="BEAUTICIAN"){
          let data = responseServices.data.cosmetologyServices.map(service => ({
            ...service,
            type: 'Косметология'
          }));
          servicesData = [...data];
        }
        else if(user.role=="ADMIN"){
          const cosmetologyData = responseServices.data.cosmetologyServices.map(service => ({
            ...service,
            type: 'Косметология'
          }));
          const hairdressingData = responseServices.data.hairdressingServices.map(service => ({
            ...service,
            type: 'Перукарня'
          }));
  
          servicesData = [...cosmetologyData, ...hairdressingData];
        }
        
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
  },[])
  const handleServiceChange = (serviceId) => {
    const selectedService = services.find(service => service.id === serviceId);
    setSelectedService(selectedService);
  };

  const handleClientChange = (clientId) => {
    if (clientId == '-1') {
      console.log("hi")
      setSelectedClient(null);
      setAddClient(true)
      setEditClient(true);
    } else {
      const selectedClient = clients.find(client => client.id === clientId);
      setSelectedClient(selectedClient);
      setEditClient(false);
    }
  };
  const handleSaveOrder = async () =>{
    if (selectedService) {
      if (isAddClient) {
        
      } else if (selectedClient) {
        
      }
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2 style={{color:'#05a9e5'}}>Послуги</h2>
          <select className="form-select" onChange={(e) => handleServiceChange(parseInt(e.target.value))}>
            <option value="">Виберіть послугу</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name} {service.price}$</option>
            ))}
          </select>
          <hr />
          {selectedService && (
            <div style={{margin:'20px'}}>
              <h4>Вибрана послуга:</h4>
              <div className='col-sm-6'><img className='rounded' width={250} height={200} src={selectedService.photo!=null?"http://localhost:3001"+selectedService.photo:"../non-image.png"} alt="Фото услуги" /></div>
              <div className='col-sm-6'>Назва: {selectedService.name}</div>
              <div className='col-sm-6'>Опис: {selectedService.description}</div>
              <div className='col-sm-6'>Тип: {selectedService.type}</div>
              <div className='col-sm-6'>Ціна: {selectedService.price}$</div>
              {selectedService.gender && (
                <div className='col-sm-6'>Стать: {selectedService.gender}</div>
              )}
            </div>
          )}
        </div>
        <div className="col-6">
          <h2 style={{color:'#05a9e5'}}>Клієнти</h2>

          <select className="form-select" onChange={(e) => handleClientChange(parseInt(e.target.value))}>
            <option value="">Виберіть кліента</option>
            <option value='-1'>Добавити кліента</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.lastname} {client.firstname}</option>
            ))}
          </select>
          {selectedClient && (
            <div>
              <input
                type="checkbox"
                className="btn-check"
                id="btn-check-outlined2"
                checked={isEditClient}
                onChange={(e) => setEditClient(e.target.checked)}
                autoComplete="off"
              />
              <label className="btn btn-outline-info" htmlFor="btn-check-outlined2">
                {isEditClient ? 'Сохранить клиента' : 'Изменить клиента'}
              </label>
            </div>
          )}
          <hr />
          {selectedClient && !isEditClient && (
            <div>
              <h4>Вибранний кліент:</h4>
              <div className='col-sm-6'>Прізвище: {selectedClient.lastname}</div>
              <hr />
              <div className='col-sm-6'>Імя: {selectedClient.firstname}</div>
              <hr />
              <div className='col-sm-6'>Возраст: {selectedClient.age}</div>
              <hr />
              <div className='col-sm-6'>Email: {selectedClient.email}</div>
              <hr />
              <div className='col-sm-6'>Телефон: {selectedClient.phone}</div>
              <hr />
            </div>
          )}
          {selectedClient && isEditClient && (
            <div>
              <div className='col-sm-6'>
                <label htmlFor="lastname" className='form-label'>Прізвище</label>
                <input type="text" className='form-control' id='lastname' placeholder={selectedClient.lastname} />
                <div className='invalid-feedback'>Впишіть коректне прізвище</div>
              </div>
              <hr />
              <div className='col-sm-6'>
                <label htmlFor="firstname" className='form-label'>Імя</label>
                <input type="text" className='form-control' id='firstname' placeholder={selectedClient.firstname} />
                <div className='invalid-feedback'>Впишіть коректне імя</div>
              </div>
              <hr />
              <div className='col-sm-6'>
                <label htmlFor="age" className='form-label'>Возраст</label>
                <input type="text" className='form-control' id='age' placeholder={selectedClient.age} />
                <div className='invalid-feedback'>Впишіть коректний вік</div>
              </div>
              <hr />
              <div className='col-sm-6'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="text" className='form-control' id='email' placeholder={selectedClient.email} />
                <div className='invalid-feedback'>Впишіть коректний email</div>
              </div>
              <hr />
              <div className='col-sm-6'>
                <label htmlFor="phone" className='form-label'>Телефон</label>
                <input type="text" className='form-control' id='phone' placeholder={selectedClient.phone} />
                <div className='invalid-feedback'>Впишіть коректний номер телефону</div>
              </div>
              <hr />
            </div>
          )}
          {!selectedClient && isEditClient && (
            <div>
              <div className='col-sm-6'>
                <label htmlFor="lastname" className='form-label'>Прізвище</label>
                <input type="text" className='form-control' id='lastname'/>
                <div className='invalid-feedback'>Впишіть коректне прізвище</div>
              </div>
              <hr />
              <div className='col-sm-6'>
                <label htmlFor="firstname" className='form-label'>Імя</label>
                <input type="text" className='form-control' id='firstname' />
                <div className='invalid-feedback'>Впишіть коректне імя</div>
              </div>
              <hr />
              <div className='col-sm-6'>
                <label htmlFor="age" className='form-label'>Возраст</label>
                <input type="text" className='form-control' id='age'/>
                <div className='invalid-feedback'>Впишіть коректний вік</div>
              </div>
              <hr />
              <div className='col-sm-6'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="text" className='form-control' id='email'/>
                <div className='invalid-feedback'>Впишіть коректний email</div>
              </div>
              <hr />
              <div className='col-sm-6'>
                <label htmlFor="phone" className='form-label'>Телефон</label>
                <input type="text" className='form-control' id='phone' />
                <div className='invalid-feedback'>Впишіть коректний номер телефону</div>
              </div>
              <hr />
            </div>
          )}
        </div>
      </div>
      <div className="d-grid gap-2">

        
      <button className="btn btn-info" type="button" disabled={!selectedService || !(selectedClient || isAddClient)} onClick={handleSaveOrder}>
        Зберегти замовлення
      </button>
        
      </div>
    </div>
  );
};

export default withAuthorization(['ADMIN','HAIRDRESSER','BEAUTICIAN'])(Order);