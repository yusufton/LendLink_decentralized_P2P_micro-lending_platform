import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Explore from './pages/Explore';
import CreateLoan from './pages/CreateLoan';
import MyLoans from './pages/MyLoans';
import './styles.css';
export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/create" element={<CreateLoan />} />
        <Route path="/mine" element={<MyLoans />} />
      </Routes>
    </BrowserRouter>
  );
}