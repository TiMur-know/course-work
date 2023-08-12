'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import withAuthorization from '../../authControl'
import ServerError from '../../server_error'
const Reports = () => {
  const formatDateTime = (dateTimeString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString('uk-UA', options);
  }
  const formatDate = (dateTimeString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString('uk-UA', options);
  }
  const initialRegistrs = [
    {
      id: 1,
      date_start: '2023-07-01',
      date_end: '2023-07-05',
      total_cost: 150,
      CosmetologyReceipts: [
        {
          id: 1,
          date_time: "2023-08-01T07:00:00.000Z",
          total_cost: 50,
          createdAt: "2023-08-09T09:19:15.096Z",
          updatedAt: "2023-08-09T09:19:15.096Z",
          CosmetologyServiceId: 2,
          ClientId: 2,
          CosmetologyReceipts_Registr: {
            id: 1,
            createdAt: "2023-08-09T09:19:15.115Z",
            updatedAt: "2023-08-09T09:19:15.115Z",
            CosmetologyReceiptId: 1,
            RegistrId: 1
          },
          Client: {
            firstname: "FirstName2",
            lastname: "Lastname2"
          },
          CosmetologyService: {
            name: "Service2"
          }
        },
        {
          id: 2,
          date_time: "2023-08-02T12:30:00.000Z",
          total_cost: 75,
          createdAt: "2023-08-09T09:19:15.096Z",
          updatedAt: "2023-08-09T09:19:15.096Z",
          CosmetologyServiceId: 1,
          ClientId: 2,
          CosmetologyReceipts_Registr: {
            id: 2,
            createdAt: "2023-08-09T09:19:15.115Z",
            updatedAt: "2023-08-09T09:19:15.115Z",
            CosmetologyReceiptId: 2,
            RegistrId: 1
          },
          Client: {
            firstname: "FirstName2",
            lastname: "Lastname2"
          },
          CosmetologyService: {
            name: "Service1"
          }
        }
      ],
      HairdressingReceipts: [
        {
          id: 1,
          date_time: "2023-08-03T11:00:00.000Z",
          total_cost: 40,
          createdAt: "2023-08-09T09:19:15.101Z",
          updatedAt: "2023-08-09T09:19:15.101Z",
          HairdressingServiceId: 1,
          ClientId: 2,
          HairdressingReceipts_Registr: {
            id: 1,
            createdAt: "2023-08-09T09:19:15.111Z",
            updatedAt: "2023-08-09T09:19:15.111Z",
            HairdressingReceiptId: 1,
            RegistrId: 1
          },
          Client: {
            firstname: "FirstName2",
            lastname: "Lastname2"
          },
          HairdressingService: {
            name: "Service3"
          }
        }
      ],
    },
    {
      id: 2,
      date_start: '2023-07-03',
      date_end: '2023-07-08',
      total_cost: 200,
      CosmetologyReceipts: [
        {
          id: 1,
          date_time: "2023-08-01T07:00:00.000Z",
          total_cost: 50,
          createdAt: "2023-08-09T09:19:15.096Z",
          updatedAt: "2023-08-09T09:19:15.096Z",
          CosmetologyServiceId: 2,
          ClientId: 2,
          CosmetologyReceipts_Registr: {
            id: 1,
            createdAt: "2023-08-09T09:19:15.115Z",
            updatedAt: "2023-08-09T09:19:15.115Z",
            CosmetologyReceiptId: 1,
            RegistrId: 1
          },
          Client: {
            firstname: "FirstName2",
            lastname: "Lastname2"
          },
          CosmetologyService: {
            name: "Service2"
          }
        },
        {
          id: 2,
          date_time: "2023-08-02T12:30:00.000Z",
          total_cost: 75,
          createdAt: "2023-08-09T09:19:15.096Z",
          updatedAt: "2023-08-09T09:19:15.096Z",
          CosmetologyServiceId: 1,
          ClientId: 2,
          CosmetologyReceipts_Registr: {
            id: 2,
            createdAt: "2023-08-09T09:19:15.115Z",
            updatedAt: "2023-08-09T09:19:15.115Z",
            CosmetologyReceiptId: 2,
            RegistrId: 1
          },
          Client: {
            firstname: "FirstName2",
            lastname: "Lastname2"
          },
          CosmetologyService: {
            name: "Service1"
          }
        }
      ],
      HairdressingReceipts: [
        {
          id: 1,
          date_time: "2023-08-03T11:00:00.000Z",
          total_cost: 40,
          createdAt: "2023-08-09T09:19:15.101Z",
          updatedAt: "2023-08-09T09:19:15.101Z",
          HairdressingServiceId: 1,
          ClientId: 2,
          HairdressingReceipts_Registr: {
            id: 1,
            createdAt: "2023-08-09T09:19:15.111Z",
            updatedAt: "2023-08-09T09:19:15.111Z",
            HairdressingReceiptId: 1,
            RegistrId: 1
          },
          Client: {
            firstname: "FirstName2",
            lastname: "Lastname2"
          },
          HairdressingService: {
            name: "Service3"
          }
        }
      ],
    },
  ];
  const initialCosmetologyReceipts = [
    {
      id: 1,
      date_time: "2023-08-01T07:00:00.000Z",
      total_cost: 50,
      createdAt: "2023-08-09T10:10:00.705Z",
      updatedAt: "2023-08-09T10:10:00.705Z",
      CosmetologyServiceId: 2,
      ClientId: 2,
      Client: {
        firstname: "FirstName2",
        lastname: "Lastname2"
      },
      CosmetologyService: {
        name: "Service2"
      }
    },
    {
      id: 2,
      date_time: "2023-08-02T12:30:00.000Z",
      total_cost: 75,
      createdAt: "2023-08-09T10:10:00.705Z",
      updatedAt: "2023-08-09T10:10:00.705Z",
      CosmetologyServiceId: 1,
      ClientId: 2,
      Client: {
        firstname: "FirstName2",
        lastname: "Lastname2"
      },
      CosmetologyService: {
        name: "Service1"
      }
    }
  ];
  const initialHairdressingReceipts = [
    {
      id: 1,
      date_time: "2023-08-03T11:00:00.000Z",
      total_cost: 40,
      createdAt: "2023-08-09T10:10:00.709Z",
      updatedAt: "2023-08-09T10:10:00.709Z",
      HairdressingServiceId: 1,
      ClientId: 2,
      Client: {
        firstname: "FirstName2",
        lastname: "Lastname2"
      },
      HairdressingService: {
        name: "Service3"
      }
    },
    {
      id: 2,
      date_time: "2023-08-04T08:45:00.000Z",
      total_cost: 60,
      createdAt: "2023-08-09T10:10:00.709Z",
      updatedAt: "2023-08-09T10:10:00.709Z",
      HairdressingServiceId: 1,
      ClientId: 1,
      Client: {
        firstname: "FirstName1",
        lastname: "Lastname1"
      },
      HairdressingService: {
        name: "Service3"
      }
    }
  ];
  const initialCosmetologyServices = [
    { id: 1, name: 'Facial Treatment' },
    { id: 2, name: 'Manicure' },
  ];
  const initialHairdressingServices = [
    { id: 1, name: 'Haircut' },
    { id: 2, name: 'Hair Coloring' },
  ];


  const [registrs, setRegistrs] = useState(initialRegistrs);
  const [cosmetologyReceipts, setCosmetologyReceipts] = useState(initialCosmetologyReceipts);
  const [hairdressingReceipts, setHairdressingReceipts] = useState(initialHairdressingReceipts);
  const [cosmetologyServices, setCosmetologyServices] = useState(initialCosmetologyServices);
  const [hairdressingServices, setHairdressingServices] = useState(initialHairdressingServices);
  const [showModal, setShowModal] = useState(false);
  const [newReportDate, setNewReportDate] = useState('');

  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedHairdressingReceipts, setSelectedHairdressingReceipts] = useState([]);
  const [selectedCosmetologyReceipts, setSelectedCosmetologyReceipts] = useState([]);
  const [hiddenReceipts, setHiddenReceipts] = useState([]);
  const [selectingReceipts, setSelectingReceipts] = useState(false);
  const [isServerData, setIsDataServer] = useState(false)
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
  const handleSelectingReceiptsChange = () => {
    setSelectingReceipts(!selectingReceipts);
    setSelectedHairdressingReceipts([]);
    setSelectedCosmetologyReceipts([]);
  };
  const getCosmetologyServiceName = (cosmetologyId) => {
    const service = cosmetologyServices.find((service) => service.id == cosmetologyId);
    return service ? service.name : '';
  };

  const getHairdressingServiceName = (hairdressingId) => {
    const service = hairdressingServices.find((service) => service.id == hairdressingId);
    return service ? service.name : '';
  };
  const handleStartDateChange = (event) => {
    setSelectedStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };

  const handleHairdressingReceiptChange = (event, receiptId) => {
    if (event.target.checked) {
      setSelectedHairdressingReceipts((prevSelectedReceipts) => [...prevSelectedReceipts, receiptId]);
    } else {
      setSelectedHairdressingReceipts((prevSelectedReceipts) => prevSelectedReceipts.filter((id) => id !== receiptId));
    }
  };

  const handleCosmetologyReceiptChange = (event, receiptId) => {
    if (event.target.checked) {
      setSelectedCosmetologyReceipts((prevSelectedReceipts) => [...prevSelectedReceipts, receiptId]);
    } else {
      setSelectedCosmetologyReceipts((prevSelectedReceipts) => prevSelectedReceipts.filter((id) => id !== receiptId));
    }
  };


  const handleAddReport = async () => {
    const newReport = {
      dateStart: selectedStartDate,
      dateEnd: selectedEndDate,
      hairdressingReceipts: selectedHairdressingReceipts,
      cosmetologyReceipts: selectedCosmetologyReceipts,
    };
    try {
      const response = await axios.post('http://localhost:3001/api/registrs', newReport);
      console.log('New report created:', response.data);

      setSelectedStartDate('');
      setSelectedEndDate('');
      setSelectedHairdressingReceipts([]);
      setSelectedCosmetologyReceipts([]);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating report:', error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/registrs');
        const data = response.data;
        setRegistrs(data)
        const responseReceipts = await axios.get('http://localhost:3001/api/receipts');
        const dataReceipts = responseReceipts.data;
        setCosmetologyReceipts(dataReceipts.cosmetologyReceipt)
        setHairdressingReceipts(dataReceipts.hairdressingReceipt)
        setIsDataServer(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const startDate = new Date(selectedStartDate);
      const endDate = new Date(selectedEndDate);
      const selectedHairdressingReceipts = hairdressingReceipts
        .filter((receipt) => {
          const receiptDate = new Date(receipt.date_time);
          return receiptDate >= startDate && receiptDate <= endDate;
        })
        .map((receipt) => receipt.id);
      setSelectedHairdressingReceipts(selectedHairdressingReceipts);

      const selectedCosmetologyReceipts = cosmetologyReceipts
        .filter((receipt) => {
          const receiptDate = new Date(receipt.date_time);
          return receiptDate >= startDate && receiptDate <= endDate;
        })
        .map((receipt) => receipt.id);
      setSelectedCosmetologyReceipts(selectedCosmetologyReceipts);
    }
  }, [selectedStartDate, selectedEndDate]);

  return (

    <div className='container'>
      {isServerData ? (<div>
        <h1 style={{ color: '#05a9e5' }}>Звіти</h1>
        <Button variant="info" onClick={() => setShowModal(true)}>
          Добавити звіт
        </Button>
        <h2 style={{ color: '#1785b6' }}>Квитанції по послугам</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Тип</th>
              <th>Послуга</th>
              <th>Дата та час</th>
              <th>Вартість</th>
              <th>Кліент</th>
            </tr>
          </thead>
          <tbody>
            {cosmetologyReceipts.map((receipt) => (
              <tr key={receipt.id}>
                <td>{receipt.id}</td>
                <td>Косметологія</td>
                <td>{receipt.CosmetologyService.name}</td>
                <td>{formatDateTime(receipt.date_time)}</td>
                <td>{receipt.total_cost}</td>
                <td>{receipt.Client.lastname + " " + receipt.Client.firstname}</td>
              </tr>
            ))}
            {hairdressingReceipts.map((receipt) => (
              <tr key={receipt.id}>
                <td>{receipt.id}</td>
                <td>Парикмахерска</td>
                <td>{receipt.HairdressingService.name}</td>
                <td>{formatDateTime(receipt.date_time)}</td>
                <td>{receipt.total_cost}</td>
                <td>{receipt.Client.lastname + " " + receipt.Client.firstname}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h2 style={{ color: '#1785b6' }}>Загальні звіти</h2>
        <Table striped bordered hover >
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
                  <td>{formatDate(registr.date_start)}</td>
                  <td>{formatDate(registr.date_end)}</td>
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
                            <th>Тип</th>
                            <th>Послуга</th>
                            <th>Дата та час</th>
                            <th>Вартість</th>
                            <th>Кліент</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registr.HairdressingReceipts.map((receipt) => (
                            <tr key={receipt.id}>
                              <td>Квитанції парикмахерскої</td>
                              <td>{receipt.HairdressingService.name}</td>
                              <td>{formatDateTime(receipt.date_time)}</td>
                              <td>{receipt.total_cost}</td>
                              <td>{receipt.Client.lastname + " " + receipt.Client.firstname}</td>
                            </tr>
                          ))}
                          {registr.CosmetologyReceipts.map((receipt) => (
                            <tr key={receipt.id}>
                              <td>Квитанції косметології</td>
                              <td>{receipt.CosmetologyService.name}</td>
                              <td>{formatDateTime(receipt.date_time)}</td>
                              <td>{receipt.total_cost}</td>
                              <td>{receipt.Client.lastname + " " + receipt.Client.firstname}</td>
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
        <div style={{ marginTop: '70px' }}></div>
        {/* Модальное окно для добавления отчета */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Добавити загальний звіт</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="reportSelectingReceipts">
                <Form.Check
                  type="checkbox"
                  label="Выбирати квитанції"
                  checked={selectingReceipts}
                  onChange={handleSelectingReceiptsChange}
                />
              </Form.Group>
              {!selectingReceipts ? (
                <div>
                  <Form.Group controlId="reportDateStart">
                    <Form.Label>Дата початку</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Виберіть дату початку"
                      value={selectedStartDate}
                      onChange={handleStartDateChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="reportDateEnd">
                    <Form.Label>Дата кінця</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Виберіть дату кінця"
                      value={selectedEndDate}
                      onChange={handleEndDateChange}
                    />
                  </Form.Group></div>) :
                (<div><Form.Group controlId="reportHairdressingReceipts">
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
                          <td>{formatDateTime(receipt.date_time)}</td>
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
                            <td>{formatDateTime(receipt.date_time)}</td>
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
                  </Form.Group></div>)}
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

      </div>) : (<ServerError />)}
    </div>
  );
};

export default withAuthorization(['ADMIN'])(Reports);