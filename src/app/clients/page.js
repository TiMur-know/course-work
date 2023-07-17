
export default function Clients() {
  const getData=()=>{
    return [];
  }
  const clients = [
    { id: 1, firstname: 'John', lastname: 'Doe', phone: '1234567890', age: 30, email: 'john@example.com' },
    { id: 2, firstname: 'Jane', lastname: 'Smith', phone: '9876543210', age: 25, email: 'jane@example.com' },
    { id: 3, firstname: 'Bob', lastname: 'Johnson', phone: '5555555555', age: 35, email: 'bob@example.com' },
  ];
    return (
      <div className="container">
      <h2 className="my-4">Клієнти</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
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
  