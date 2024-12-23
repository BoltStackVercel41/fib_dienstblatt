import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { AuthSection } from './TimeClock/AuthSection';

export function Navbar() {
  const { user, loading, linkedEmployee } = useAuth();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">System</Link>
          <Link to="/time-clock" className="text-gray-700 hover:text-gray-900">Time Clock</Link>
        </div>
        <div className="w-96">
          <AuthSection 
            user={user} 
            loading={loading} 
            linkedEmployee={linkedEmployee}
          />
        </div>
      </div>
    </nav>
  );
}