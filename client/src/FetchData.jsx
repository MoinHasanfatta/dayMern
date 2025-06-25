import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

export default function FetchData() {
  const [users,setUsers] = useState([])
  fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data =>  setUsers(data))

  return (
    <div>
      <h1> Demo Data Fetch </h1>
      <ul>
        {users.map ((user)=> (
          <li key={user.id}> {user.name} && {user.email}</li>
        ))}
      </ul>

      <table className="table table-light">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">City</th>
      <th scope="col">Company</th>
    </tr>
  </thead>
  <tbody>
      {users.map((user)=>(
        <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.address.city}</td>
      <td>{user.company.name}</td>
    </tr>
    ))}
  </tbody>
</table>
    </div>

  )
}

