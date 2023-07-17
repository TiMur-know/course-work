'use client'
import React, { useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';

const Reports = () => {
    const registrs = [
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
    const cosmetologyReceipts = [
        { id: 1, cosmetology_id: 1, date_time: '2023-07-01 10:00', total_cost: 50, client_id: 1 },
        { id: 2, cosmetology_id: 2, date_time: '2023-07-02 15:30', total_cost: 25, client_id: 2 },
      ];
    
      const hairdressingReceipts = [
        { id: 1, hairdressing_id: 1, date_time: '2023-07-01 13:30', total_cost: 35, client_id: 1 },
        { id: 2, hairdressing_id: 2, date_time: '2023-07-03 11:00', total_cost: 60, client_id: 2 },
      ];
    
      const cosmetologyServices = [
        { id: 1, name: 'Facial Treatment' },
        { id: 2, name: 'Manicure' },
      ];
    
      const hairdressingServices = [
        { id: 1, name: 'Haircut' },
        { id: 2, name: 'Hair Coloring' },
      ];
    
      const clients = [
        { id: 1, firstname: 'John', lastname: 'Doe' },
        { id: 2, firstname: 'Jane', lastname: 'Smith' },
      ];
      const getCosmetologyServiceName = (cosmetologyId) => {
        const service = cosmetologyServices.find((service) => service.id === cosmetologyId);
        return service ? service.name : '';
      };
    
      const getHairdressingServiceName = (hairdressingId) => {
        const service = hairdressingServices.find((service) => service.id === hairdressingId);
        return service ? service.name : '';
      };
    
      const [showModal, setShowModal] = useState(false);
      const [newReportDate, setNewReportDate] = useState('');
    
      const handleAddReport = () => {
        // Обработчик добавления отчета
        // Можно отправить новый отчет на сервер или обновить состояние в компоненте
        // В данном примере, новый отчет просто выводится в консоль
        console.log('New report date:', newReportDate);
    
        // Сброс формы и закрытие модального окна
        setNewReportDate('');
        setShowModal(false);
      };

  return (
    <div className='container'>
  <h1>Отчеты</h1>
   <Button variant="primary" onClick={() => setShowModal(true)}>
        Добавить отчет
      </Button>
  <h2>Отчеты по услугам</h2>
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Тип</th>
        <th>Услуга</th>
        <th>Дата и время</th>
        <th>Сумма</th>
        <th>Клиент</th>
      </tr>
    </thead>
    <tbody>
      {cosmetologyReceipts.map((receipt) => (
        <tr key={receipt.id}>
          <td>{receipt.id}</td>
          <td>Косметология</td>
          <td>{getCosmetologyServiceName(receipt.cosmetology_id)}</td>
          <td>{receipt.date_time}</td>
          <td>{receipt.total_cost}</td>
          <td>{receipt.client_id}</td>
        </tr>
      ))}
      {hairdressingReceipts.map((receipt) => (
        <tr key={receipt.id}>
          <td>{receipt.id}</td>
          <td>Парикмахерская</td>
          <td>{getHairdressingServiceName(receipt.hairdressing_id)}</td>
          <td>{receipt.date_time}</td>
          <td>{receipt.total_cost}</td>
          <td>{receipt.client_id}</td>
        </tr>
      ))}
    </tbody>
  </Table>
  <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата начала</th>
            <th>Дата конца</th>
            <th>Сумма</th>
            <th>Квитанции парикмахерской</th>
            <th>Квитанции косметологии</th>
          </tr>
        </thead>
        <tbody>
          {/* Отображение отчетов и связанных квитанций */}
          {registrs.map((registr) => (
            <tr key={registr.id}>
              <td>{registr.id}</td>
              <td>{registr.date_start}</td>
              <td>{registr.date_end}</td>
              <td>{registr.total_cost}</td>
              <td>
                {/* Отображение квитанций парикмахерской */}
                {registr.hairdressingReceipts.map((receipt) => (
                  <span key={receipt.id}>{getHairdressingServiceName(receipt.hairdressing_id)}</span>
                ))}
              </td>
              <td>
                {/* Отображение квитанций косметологии */}
                {registr.cosmetologyReceipts.map((receipt) => (
                  <span key={receipt.id}>{getCosmetologyServiceName(receipt.cosmetology_id)}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  {/* Модальное окно для добавления отчета */}
  <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить общий отчет</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="reportDateStart">
              <Form.Label>Дата начала</Form.Label>
              <Form.Control
                type="date"
                placeholder="Выберите дату начала"
                onChange={(e) => setNewReport({ ...newReport, dateStart: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="reportDateEnd">
              <Form.Label>Дата конца</Form.Label>
              <Form.Control
                type="date"
                placeholder="Выберите дату конца"
                onChange={(e) => setNewReport({ ...newReport, dateEnd: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="reportHairdressingReceipts">
  <Form.Label>Квитанции парикмахерской</Form.Label>
  <Table striped bordered>
    <thead>
      <tr>
        <th>ID</th>
        <th>Услуга</th>
        <th>Дата и время</th>
        <th>Сумма</th>
        <th>Клиент</th>
        <th>Выбрать</th>
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
  <Form.Label>Квитанции косметологии</Form.Label>
  <Table striped bordered>
    <thead>
      <tr>
        <th>ID</th>
        <th>Услуга</th>
        <th>Дата и время</th>
        <th>Сумма</th>
        <th>Клиент</th>
        <th>Выбрать</th>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleAddReport}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

</div>

  );
};

export default Reports;