import React from 'react';
import Header from './page/Header';
import ReactDOM from 'react-dom/client';
import Dashboard from './page/Dashboard';
import History from './page/History';
import Datasensor from './page/Datasensor';
import Profile from './page/Proflie';
import '../src/index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from './components/Chart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header/>
      <Routes>  
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/History" element={<History/>} />
        <Route path="/Datasensor" element={<Datasensor/>} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


