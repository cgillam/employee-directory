import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchUsers from './database.js';
import UsersTable from "./components/UsersTable.js"



function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => setUsers(fetchUsers(100)), 1000);
  }, []);

  if (!users.length) return <h1>Loading...</h1>

  return (
    <>
      <UsersTable users={users} />
    </>
  );
}

export default App;
