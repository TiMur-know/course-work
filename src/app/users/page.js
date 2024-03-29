'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Button, Collapse, Table, Form } from 'react-bootstrap';
import ServerError from '../../server_error'
import withAuthorization from '../../authControl'
const Users = () => {
  const initialUsers = [
    { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1', role: 'USER' },
    { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2', role: 'USER' },
    { id: 3, username: 'user3', email: 'user3@example.com', password: 'password3', role: 'BEAUTICIAN' },
  ];

  const initialWorkers = [
    { id: 1, userId: 1, firstname: 'John', lastname: 'Doe', phone: '1234567890', age: 30, email: 'john@example.com', UserId: 1 },
    { id: 2, userId: 2, firstname: 'Jane', lastname: 'Doe', phone: '9876543210', age: 25, email: 'jane@example.com', UserId: 2 },
    { id: 3, userId: 3, firstname: 'Bob', lastname: 'Smith', phone: '5555555555', age: 35, email: 'bob@example.com', UserId: 3 },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [workers, setWorkers] = useState(initialWorkers);
  const [expandedWorkerId, setExpandedWorkerId] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isServerData, setIsDataServer] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:3001/api/users');
        setUsers(usersResponse.data);

        const workersResponse = await axios.get('http://localhost:3001/api/workers');
        setWorkers(workersResponse.data);
        setIsDataServer(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])
  const handleToggle = (workerId) => {
    if (expandedWorkerId === workerId) {
      setExpandedWorkerId(null);
    } else {
      setExpandedWorkerId(workerId);
    }
  };

  const handleDeleteUser = (userId) => {
    setIsDataChanged(true)
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

  const handleSaveChanges = async () => {
    try {
      const data = { updatedUsers: users, updatedWorkers: workers };
      console.log(data)
      // Отправка данных на сервер
      await axios.post('http://localhost:3001/api/users', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Сброс флага изменений
      setIsDataChanged(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <Container>
      {isServerData ? (<div>
        <h1 style={{ color: '#05a9e5' }}>Користувачі</h1>

        <Table striped bordered>
          <thead>
            <tr>
              <th>Логін</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Дії</th>
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
                      <option value="USER">Користувач</option>
                      <option value="HAIRDRESSER">Парикмахер</option>
                      <option value="BEAUTICIAN">Косметолог</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleToggle(user.id)}
                      aria-controls={`worker-info-${user.id}`}
                      aria-expanded={expandedWorkerId === user.id}
                    >
                      Детально
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                      Видалити
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
                              <th>Прізвище</th>
                              <th>Імя</th>
                              <th>Номер телефону</th>
                              <th>Возраст</th>
                            </tr>
                          </thead>
                          <tbody>
                            {workers
                              .filter((worker) => worker.UserId === user.id)
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
          <Button variant="info" disabled onClick={handleSaveChanges}>
            Зберегти
          </Button>
        )}
        {isDataChanged && (
          <Button variant="info" onClick={handleSaveChanges}>
            Зберегти
          </Button>
        )}</div>) : (<ServerError />)}
    </Container>
  );
};
export default withAuthorization(['ADMIN'])(Users);