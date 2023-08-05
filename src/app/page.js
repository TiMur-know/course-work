"use client"
import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

const Home = () => {
  const user = { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1', role: 'USER' };
  const [showModal, setShowModal] = useState(false);
  const [salonInformation, setSalonInformation] = useState({
    name: 'Ларе',
    description: `Наш салон краси "Ларе" - це місце, де ми створюємо красу та надаємо розкішний догляд для наших клієнтів. Завітавши до нас, ви зможете насолодитися професійними послугами від нашої дружньої та талановитої команди експертів у галузі краси.`
    +`Cras commodo leo volutpat diam interdum congue. Nulla sagittis dolor a semper pellentesque. Vivamus porttitor nibh in risus sodales fringilla. Aenean non lacus lobortis leo sodales rutrum a vitae velit. Etiam molestie leo eu purus accumsan, id porttitor arcu faucibus. Nullam dictum quam ut lorem cursus finibus. Donec finibus auctor ligula, quis placerat odio pretium id. Vestibulum sed erat in sem luctus varius et vel tortor. Mauris a lacus ex.`
    +``,
    photo: 'salon.jpg',
    schedule: [
      { day: 'Понеділок', hours: '9:00 AM - 6:00 PM' },
      { day: 'Вівторок', hours: '9:00 AM - 6:00 PM' },
      { day: 'Середа', hours: '9:00 AM - 6:00 PM' },
      { day: 'Четверг', hours: '9:00 AM - 6:00 PM' },
      { day: 'П`ятниця', hours: '9:00 AM - 6:00 PM' },
      { day: 'Субота', hours: '10:00 AM - 4:00 PM' },
      { day: 'Неділя', hours: 'Закрито' },
    ],
    contacts:{
      phone1:"0659677446",
      phone2:"0567573628",
      email:"smail@gmail.com"
    },
    mapURL: 'https://www.google.com/maps/embed?pb=!1m24...',
  });

  // Modal State for Edit Page Modal
  const [iframeLink, setIframeLink] = useState(salonInformation.mapURL);
  const [workingHours, setWorkingHours] = useState([...salonInformation.schedule]);

  const handleEditPage = () => {
    setShowModal(true);
  };
  const [contacts, setContacts] = useState({
    phone1: salonInformation.contacts.phone1,
    phone2: salonInformation.contacts.phone2,
    email: salonInformation.contacts.email,
  });
  const handleChangeContact = (name, value) => {
    setContacts((prevContacts) => ({
      ...prevContacts,
      [name]: value,
    }));
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = () => {
    // Here you can implement saving changes made in the modal
    setSalonInformation({
      ...salonInformation,
      mapURL: iframeLink,
      schedule: workingHours,
      contacts: { ...contacts },
    });
    setShowModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {/* Salon Information */}
          <h1 style={{color:'#05a2e5'}}>Ласкаво просимо в "{salonInformation.name}"</h1>
          <img src={salonInformation.photo} alt="Salon" className="rounded float-start  mb-3" width={450} height={350} style={{marginRight:'10px',marginBottom:'10px'}}/>
          <div>{salonInformation.description}</div>
        </div>
        <div className="col-md-4">
          {/* Working Hours */}
          <h2>Години работи</h2>
          <ul className="list-unstyled">
            {salonInformation.schedule.map((item) => (
              <li className="list-group-item" key={item.day}>
                {item.day}: {item.hours}
              </li>
            ))}
          </ul>
          <h3>Контактна інформація</h3>
          <div>
          <ul className="list-unstyled">
          <li className="list-group-item" >Номер телефону 1: {contacts.phone1}</li>
          <li className="list-group-item" >Номер телефону 2: {contacts.phone2}</li>
          <li className="list-group-item" >Email: {contacts.email}</li>
          </ul>
          </div>
          {/* Google Map */}
          <h2>Локація</h2>
          <div>
            <iframe
              title="Google Map"
              src={salonInformation.mapURL}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Edit Page Modal */}
      {user.role=="ADMIN"&&(
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Редагування Сторінки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="salonName">
              <Form.Label>Назва Салону</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter salon name"
                value={salonInformation.name}
                onChange={(e) => setSalonInformation({ ...salonInformation, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="salonDescription">
              <Form.Label>Описання Салону</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={salonInformation.description}
                onChange={(e) =>
                  setSalonInformation({ ...salonInformation, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="phone1">
              <Form.Label>Телефон 1</Form.Label>
              <Form.Control
                type="text"
                value={contacts.phone1}
                onChange={(e) => handleChangeContact('phone1', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phone2">
              <Form.Label>Телефон 2</Form.Label>
              <Form.Control
                type="text"
                value={contacts.phone2}
                onChange={(e) => handleChangeContact('phone2', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email1">
              <Form.Label>Email 1</Form.Label>
              <Form.Control
                type="email"
                value={contacts.email1}
                onChange={(e) => handleChangeContact('email1', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="iframeLink">
              <Form.Label>Google Map Iframe Посилання</Form.Label>
              <Form.Control
                type="text"
                value={iframeLink}
                onChange={(e) => setIframeLink(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="workingHours">
              <Form.Label>Робочі Години</Form.Label>
              {workingHours.map((workingHour, index) => (
                <Row key={index} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      value={workingHour.day}
                      onChange={(e) => {
                        const updatedWorkingHours = [...workingHours];
                        updatedWorkingHours[index].day = e.target.value;
                        setWorkingHours(updatedWorkingHours);
                      }}
                      disabled
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      value={workingHour.hours}
                      onChange={(e) => {
                        const updatedWorkingHours = [...workingHours];
                        updatedWorkingHours[index].hours = e.target.value;
                        setWorkingHours(updatedWorkingHours);
                      }}
                    />
                  </Col>
                </Row>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleModalSave}>
            Зберегти зміни
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Закрити
          </Button>
        </Modal.Footer>
      </Modal>)}

      {/* Edit Page Button */}
      {user!=null&&user.role=="ADMIN"&&(
      <div className="mt-4 text-center">
        <Button variant="info" onClick={handleEditPage}>
          Редагувати сторінку
        </Button>
      </div>
      )}
    </div>
    
  );
};

export default Home;

