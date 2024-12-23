import React from 'react';
import { useEmployees } from '../hooks/useEmployees';

export function SystemPage() {
  const { employees, isLoading, error } = useEmployees();

  if (isLoading) return <div className="p-4">Loading system data...</div>;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">System Overview</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insurance ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.serviceNumber}>
                <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.serviceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.rank}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.insuranceId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}