import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SystemPage } from './components/SystemPage';
import { TimeClock } from './components/TimeClock/index';
import { Navbar } from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<SystemPage />} />
            <Route path="/time-clock" element={<TimeClock />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}