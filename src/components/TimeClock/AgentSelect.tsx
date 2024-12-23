import React from 'react';
import type { Employee } from '../../types/employee';

interface AgentSelectProps {
  employees: Employee[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AgentSelect({ employees, value, onChange, disabled }: AgentSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full p-2 border rounded bg-white disabled:bg-gray-100"
    >
      <option value="">Select Agent</option>
      {employees.map((employee) => (
        <option key={employee.serviceNumber} value={employee.serviceNumber}>
          {employee.name} ({employee.serviceNumber})
        </option>
      ))}
    </select>
  );
}