import React from 'react';
import { Clock } from 'lucide-react';
import { useTimeClock } from '../../hooks/useTimeClock';
import { useEmployees } from '../../hooks/useEmployees';
import { useAuth } from '../../hooks/useAuth';
import { ActiveAgents } from './ActiveAgents';

export function TimeClock() {
  const { user } = useAuth();
  const { employees, isLoading: isLoadingEmployees } = useEmployees();
  const { checkIn, checkOut, activeEmployees, error, isChecking } = useTimeClock();

  const matchingEmployee = user && employees.find(
    (employee) => employee.email.toLowerCase() === user.email?.toLowerCase()
  );

  const handleCheckIn = async () => {
    if (matchingEmployee) {
      await checkIn(matchingEmployee.serviceNumber);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        Please sign in to use the Time Clock.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold">Time Clock</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Check In</h2>
        
        {matchingEmployee && !activeEmployees.find(e => e.employeeId === matchingEmployee.serviceNumber) && (
          <button
            onClick={handleCheckIn}
            disabled={isChecking}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isChecking ? 'Checking In...' : 'Check In'}
          </button>
        )}
        
        {!matchingEmployee && (
          <p className="text-sm text-yellow-600">
            No matching employee record found for your email address.
          </p>
        )}
        
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Active Agents</h2>
        <ActiveAgents
          entries={activeEmployees}
          onCheckOut={checkOut}
        />
      </div>
    </div>
  );
}