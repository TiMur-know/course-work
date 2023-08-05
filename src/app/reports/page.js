'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';

const Reports = () => {
  



    const initialRegistrs = [
        {
          id: 1,
          date_start: '2023-07-01',
          date_end: '2023-07-05',
          total_cost: 150,
          hairdressingReceipts: [
            { id: 1, hairdressing_id: 1 },
            { id: 2, hairdressing_id: 2 },
          ],
          cosmetologyReceipts: [
            { id: 1, cosmetology_id: 1 },
            { id: 2, cosmetology_id: 2 },
          ],
        },
        {
          id: 2,
          date_start: '2023-07-03',
          date_end: '2023-07-08',
          total_cost: 200,
          hairdressingReceipts: [
            { id: 3, hairdressing_id: 1 },
            { id: 4, hairdressing_id: 2 },
          ],
          cosmetologyReceipts: [
            { id: 3, cosmetology_id: 1 },
            { id: 4, cosmetology_id: 2 },
          ],
        },
      ];
    const initialCosmetologyReceipts = [
        { id: 1, cosmetology_id: 1, date_time: '2023-07-01 10:00', total_cost: 50, client_id: 1 },
        { id: 2, cosmetology_id: 2, date_time: '2023-07-02 15:30', total_cost: 25, client_id: 2 },
      ];   
      const initialHairdressingReceipts = [
        { id: 1, hairdressing_id: 1, date_time: '2023-07-01 13:30', total_cost: 35, client_id: 1 },
        { id: 2, hairdressing_id: 2, date_time: '2023-07-03 11:00', total_cost: 60, client_id: 2 },
      ];
      const initialCosmetologyServices = [
        { id: 1, name: 'Facial Treatment' },
        { id: 2, name: 'Manicure' },
      ];
      const initialHairdressingServices = [
        { id: 1, name: 'Haircut' },
        { id: 2, name: 'Hair Coloring' },
      ];
      const initialClients = [
        { id: 1, firstname: 'John', lastname: 'Doe' },
        { id: 2, firstname: 'Jane', lastname: 'Smith' },
      ];
      
      const [registrs, setRegistrs] = useState(initialRegistrs);
      const [cosmetologyReceipts, setCosmetologyReceipts] = useState(initialCosmetologyReceipts);
      const [hairdressingReceipts, setHairdressingReceipts] = useState(initialHairdressingReceipts);
      const [cosmetologyServices, setCosmetologyServices] = useState(initialCosmetologyServices);
      const [hairdressingServices, setHairdressingServices] = useState(initialHairdressingServices);
      const [clients, setClients] = useState(initialClients);
      const [showModal, setShowModal] = useState(false);
      const [newReportDate, setNewReportDate] = useState('');

      const [hiddenReceipts, setHiddenReceipts] = useState([]);
      const isReceiptHidden = (receiptId) => {
        return hiddenReceipts.includes(receiptId);
      };
      const toggleReceiptVisibility = (receiptId) => {
        setHiddenReceipts((prevHiddenReceipts) => {
          if (prevHiddenReceipts.includes(receiptId)) {
            return prevHiddenReceipts.filter((id) => id !== receiptId);
          } else {
            return [...prevHiddenReceipts, receiptId];
          }
        });
      };
      const getCosmetologyServiceName = (cosmetologyId) => {
        const service = cosmetologyServices.find((service) => service.id === cosmetologyId);
        return service ? service.name : '';
      };
    
      const getHairdressingServiceName = (hairdressingId) => {
        const service = hairdressingServices.find((service) => service.id === hairdressingId);
        return service ? service.name : '';
      };
    
      
    
      const handleAddReport = () => {
        // Обработчик добавления отчета
        // Можно отправить новый отчет на сервер или обновить состояние в компоненте
        // В данном примере, новый отчет просто выводится в консоль
        console.log('New report date:', newReportDate);
    
        // Сброс формы и закрытие модального окна
        setNewReportDate('');
        setShowModal(false);
      };
      useEffect(()=>{
        async function fetchData(){
          try {
            const responseRegistrs = await axios.get('http://localhost:3001/api/registrs');
            setRegistrs(responseRegistrs.data);

            const responseCosmetologyReceipts = await axios.get('http://localhost:3001/api/cosmetologyReceipts');
            setCosmetologyReceipts(responseCosmetologyReceipts.data);

            const responseHairdressingReceipts = await axios.get('http://localhost:3001/api/hairdressingReceipts');
            setHairdressingReceipts(responseHairdressingReceipts.data);

            const responseCosmetologyServices = await axios.get('http://localhost:3001/api/cosmetologyServices');
            setCosmetologyServices(responseCosmetologyServices.data);

            const responseHairdressingServices = await axios.get('http://localhost:3001/api/hairdressingServices');
            setHairdressingServices(responseHairdressingServices.data);

            const responseClients = await axios.get('http://localhost:3001/api/clients');
            setClients(responseClients.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData()
      },[])
  return (
    <div className='container'>
  <h1 style={{color:'#05a9e5'}}>Звіти</h1>
   <Button variant="info" onClick={() => setShowModal(true)}>
        Добавити звіт
      </Button>
  <h2 style={{color:'#1785b6'}}>Звіти по послугам</h2>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Тип</th>
        <th>Послуга</th>
        <th>Дата та час</th>
        <th>Сумма</th>
        <th>Кліент</th>
      </tr>
    </thead>
    <tbody>
      {cosmetologyReceipts.map((receipt) => (
        <tr key={receipt.id}>
          <td>{receipt.id}</td>
          <td>Косметологія</td>
          <td>{getCosmetologyServiceName(receipt.cosmetology_id)}</td>
          <td>{receipt.date_time}</td>
          <td>{receipt.total_cost}</td>
          <td>{receipt.client_id}</td>
        </tr>
      ))}
      {hairdressingReceipts.map((receipt) => (
        <tr key={receipt.id}>
          <td>{receipt.id}</td>
          <td>Парикмахерска</td>
          <td>{getHairdressingServiceName(receipt.hairdressing_id)}</td>
          <td>{receipt.date_time}</td>
          <td>{receipt.total_cost}</td>
          <td>{receipt.client_id}</td>
        </tr>
      ))}
    </tbody>
  </Table>
  <h2 style={{color:'#1785b6'}}>Загальні звіти</h2>
  <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата початку</th>
            <th>Дата кінця</th>
            <th>Сумма</th>
            <th>Связані квитанції</th>

          </tr>
        </thead>
        <tbody>
          {registrs.map((registr) => (
            <React.Fragment key={registr.id}>
              <tr>
                <td>{registr.id}</td>
                <td>{registr.date_start}</td>
                <td>{registr.date_end}</td>
                <td>{registr.total_cost}</td>
                <td>
                  <Button
                    variant="link"
                    onClick={() => toggleReceiptVisibility(registr.id)}
                  >
                    {isReceiptHidden(registr.id) ? 'Показати' : 'Спрятать'}
                  </Button>
                </td>
              </tr>
              {!isReceiptHidden(registr.id) && (
                <tr>
                  <td colSpan="6">
                    <Table striped bordered>
                      <thead>
                        <tr>
                          <th>Квитанції парикмахерскої</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registr.hairdressingReceipts.map((receipt) => (
                          <tr key={receipt.id}>
                            <td>{getHairdressingServiceName(receipt.hairdressing_id)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Table striped bordered>
                      <thead>
                        <tr>
                          <th>Квитанції косметології</th>
                        </tr>
                      </thead>
                      <tbody>
                        {registr.cosmetologyReceipts.map((receipt) => (
                          <tr key={receipt.id}>
                            <td>{getCosmetologyServiceName(receipt.cosmetology_id)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
  {/* Модальное окно для добавления отчета */}
  <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Добавити загальний звіт</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="reportDateStart">
              <Form.Label>Дата початку</Form.Label>
              <Form.Control
                type="date"
                placeholder="Виберіть дату початку"
                onChange={(e) => setNewReport({ ...newReport, dateStart: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="reportDateEnd">
              <Form.Label>Дата кінця</Form.Label>
              <Form.Control
                type="date"
                placeholder="Виберіть дату кінця"
                onChange={(e) => setNewReport({ ...newReport, dateEnd: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="reportHairdressingReceipts">
  <Form.Label>Квитанції парикмахерскої</Form.Label>
  <Table striped bordered>
    <thead>
      <tr>
        <th>ID</th>
        <th>Послуга</th>
        <th>Дата та час</th>
        <th>Сумма</th>
        <th>Кліент</th>
        <th>Вибрати</th>
      </tr>
    </thead>
    <tbody>
      {hairdressingReceipts.map((receipt) => (
        <tr key={receipt.id}>
          <td>{receipt.id}</td>
          <td>{getHairdressingServiceName(receipt.hairdressing_id)}</td>
          <td>{receipt.date_time}</td>
          <td>{receipt.total_cost}</td>
          <td>{receipt.client_id}</td>
          <td>
            <Form.Check
              type="checkbox"
              onChange={(e) => handleHairdressingReceiptChange(e, receipt.id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</Form.Group>

<Form.Group controlId="reportCosmetologyReceipts">
  <Form.Label>Квитанції косметології</Form.Label>
  <Table striped bordered>
    <thead>
      <tr>
        <th>ID</th>
        <th>Послуга</th>
        <th>Дата та час</th>
        <th>Сумма</th>
        <th>Кліент</th>
        <th>Вибрати</th>
      </tr>
    </thead>
    <tbody>
      {cosmetologyReceipts.map((receipt) => (
        <tr key={receipt.id}>
          <td>{receipt.id}</td>
          <td>{getCosmetologyServiceName(receipt.cosmetology_id)}</td>
          <td>{receipt.date_time}</td>
          <td>{receipt.total_cost}</td>
          <td>{receipt.client_id}</td>
          <td>
            <Form.Check
              type="checkbox"
              onChange={(e) => handleCosmetologyReceiptChange(e, receipt.id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="info" onClick={handleAddReport}>
            Добавити
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>

</div>

  );
};

export default Reports;