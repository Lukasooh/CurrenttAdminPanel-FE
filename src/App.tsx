import React, { useEffect, useState } from 'react';

type Item = {
  id: string;
  email: string;
  firstName: number;
  lastName: string;
  role: string;
};

const API_URL = 'http://localhost:3000/items';
const API_URL_AUTH = 'http://localhost:3000/auth/login';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newFirstName, setNewFirstName] = useState<string>('');
  const [newLastName, setNewLastName] = useState<string>('');
  const [newRole, setNewRole] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const fetchItems = async () => {
    const res = await fetch(API_URL);
    const data: Item[] = await res.json();
    setItems(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    // Placeholder for real authentication
    console.log("Logging in with:", { email, password });
    authenticate(); 
    // Reset form
    setEmail("");
    setPassword("");
  };


  const createItem = async () => {
    if (!newFirstName.trim()) return;
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: newFirstName, lastName: newLastName, email: newEmail , role: newRole }),
    });
    setNewFirstName('');
    fetchItems();
  };

  const deleteItem = async (id: string) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    fetchItems();
  };

  const authenticate = async () => {
    const res = await fetch(API_URL_AUTH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  }
  

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Items</h1>
      <input
        value={newFirstName}
        onChange={(e) => setNewFirstName(e.target.value)}
        placeholder="user first name"
      />
      <input
        value={newLastName}
        onChange={(e) => setNewLastName(e.target.value)}
        placeholder="user last name"
      />
      <input
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="user email"
      />
       <input
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        placeholder="user role"
      />
      <button onClick={createItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.firstName} {item.email}{' '}
            <button onClick={() => deleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
         
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
        <button 
        type="submit" >Login</button>
      </form>
    </div>
    
  );
};

export default App;