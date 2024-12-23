import React from 'react';
import type { TimeClockEntry } from '../../types/employee';
import { useEmployees } from '../../hooks/useEmployees';

interface ActiveAgentsProps {
  entries: TimeClockEntry[];
  onCheckOut: (id: string) => void;
}

export function ActiveAgents({ entries, onCheckOut }: ActiveAgentsProps) {
  const { employees } = useEmployees();
  
  const getAgentName = (serviceNumber: string) => {
    const employee = employees.find(e => e.serviceNumber === serviceNumber);
    return employee?.name || serviceNumber;
  };

  if (entries.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No agents currently on duty
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <div 
          key={entry.employeeId}
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
        >
          <div className="flex flex-col">
            <span className="font-medium">{getAgentName(entry.employeeId)}</span>
            <span className="text-sm text-gray-500">
              Since: {new Date(entry.checkIn).toLocaleTimeString()}
            </span>
          </div>
          <button
            onClick={() => onCheckOut(entry.employeeId)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Check Out
          </button>
        </div>
      ))}
    </div>
  );
}