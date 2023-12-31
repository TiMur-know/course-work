'use client'
import React, { useState } from 'react';
import { Container, Button, Collapse, Table, Form } from 'react-bootstrap';

const Users = () => {
  const initialUsers = [
    { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1', role: 'USER' },
    { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2', role: 'USER' },
    { id: 3, username: 'user3', email: 'user3@example.com', password: 'password3', role: 'BEAUTICIAN' },
  ];

  const workers = [
    { id: 1, userId: 1, firstname: 'John', lastname: 'Doe', phone: '1234567890', age: 30, email: 'john@example.com' },
    { id: 2, userId: 2, firstname: 'Jane', lastname: 'Doe', phone: '9876543210', age: 25, email: 'jane@example.com' },
    { id: 3, userId: 3, firstname: 'Bob', lastname: 'Smith', phone: '5555555555', age: 35, email: 'bob@example.com' },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [expandedWorkerId, setExpandedWorkerId] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const handleToggle = (workerId) => {
    if (expandedWorkerId === workerId) {
      setExpandedWorkerId(null);
    } else {
      setExpandedWorkerId(workerId);
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleChangeRole = (userId, event) => {
    const newRole = event.target.value;
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          setIsDataChanged(true);
          return { ...user, role: newRole };
        }
        return user;
      })
    );
  };

  const handleSaveChanges = () => {
    // Save changes here
    setIsDataChanged(false);
  };

  return (
    <Container>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Логин</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Form.Select value={user.role} onChange={(event) => handleChangeRole(user.id, event)}>
                    <option value="USER">Пользователь</option>
                    <option value="HAIRDRESSER">Парикмахер</option>
                    <option value="BEAUTICIAN">Косметолог</option>
                    <option value="ADMIN">Администратор</option>
                  </Form.Select>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleToggle(user.id)}
                    aria-controls={`worker-info-${user.id}`}
                    aria-expanded={expandedWorkerId === user.id}
                  >
                    Подробно
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                    Удалить
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <Collapse in={expandedWorkerId === user.id}>
                    <div id={`worker-info-${user.id}`} className="mt-3">
                      <Table striped bordered>
                        <thead>
                          <tr>
                            <th>Фамилия</th>
                            <th>Имя</th> 
                            <th>Номер телефона</th>
                            <th>Возраст</th>
                          </tr>
                        </thead>
                        <tbody>
                          {workers
                            .filter((worker) => worker.userId === user.id)
                            .map((worker) => (
                              <tr key={worker.id}>
                                <td>{worker.lastname}</td>
                                <td>{worker.firstname}</td>
                                <td>{worker.phone}</td>
                                <td>{worker.age}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      {!isDataChanged && (
        <Button variant="primary" disabled onClick={handleSaveChanges}>
          Сохранить
        </Button>
      )}
      {isDataChanged && (
        <Button variant="primary" onClick={handleSaveChanges}>
          Сохранить
        </Button>
      )}
    </Container>
  );
};

export default Users;