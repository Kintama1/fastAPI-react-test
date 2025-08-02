import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch("/api/users");
        const data = await result.json();
        setUsers(data.users);  // Extract the users array
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Users from FastAPI:</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <ul style={{textAlign: 'left'}}>
            {users.map(user => (
              <li key={user.id}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;