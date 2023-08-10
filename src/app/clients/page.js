'use client'
import axios from "axios";
import { useEffect,useState } from "react";
import withAuthorization  from '../../authControl'
const Clients=()=> {
  const initialClients = [
    { id: 1, firstname: 'John', lastname: 'Doe', phone: '1234567890', age: 30, email: 'john@example.com' },
    { id: 2, firstname: 'Jane', lastname: 'Smith', phone: '9876543210', age: 25, email: 'jane@example.com' },
    { id: 3, firstname: 'Bob', lastname: 'Johnson', phone: '5555555555', age: 35, email: 'bob@example.com' },
  ];
  const [clients, setClients] = useState(initialClients);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/clients'); // Запрос к API
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
      
    }
    fetchData();
  }, []);
  
    return (
      <div className="container">
      <h2 className="my-4" style={{color:'#05a9e5'}}>Клієнти</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Імя</th>
            <th>Прізвище</th>
            <th>Телефон</th>
            <th>Возраст</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.firstname}</td>
              <td>{client.lastname}</td>
              <td>{client.phone}</td>
              <td>{client.age}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
  }

export default withAuthorization(['ADMIN','HAIRDRESSER','BEAUTICIAN'])(Clients);