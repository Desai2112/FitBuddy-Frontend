import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Appointments from './Appointments';
import Scanner from './Scanner';
import Profile from './Profile';

const DoctorDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="appointments" element={<Appointments />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="appointments" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default DoctorDashboard; 