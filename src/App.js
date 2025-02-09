
import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './components/hoc';

function App() {

  const getUser = () =>{
    fetch("/api/users")
    .then(res => res.json())
    .then(json => console.log(json))
  }

  useEffect(() => {
    getUser()
  },[])

  return (
    < Dashboard />
  );
}

export default App;
