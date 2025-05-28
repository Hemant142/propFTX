import './App.css'
import AllRoutes from './Routes/AllRoutes'
import Navbar from './Components/Navbar';
import React, { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  return (
    <div style={{ minHeight: '100vh', background: 'none' }}>
      <Navbar search={search} setSearch={setSearch} />
      <div style={{ paddingTop: 80 }}>
        <AllRoutes search={search} setSearch={setSearch} />
      </div>
    </div>
  );
}

export default App
