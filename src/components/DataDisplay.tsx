import React from 'react';
import type { SheetRow } from '../types/sheets';
import { logger } from '../utils/logger';

interface DataDisplayProps {
  data: SheetRow[];
  isLoading: boolean;
  error: Error | null;
}

export function DataDisplay({ data, isLoading, error }: DataDisplayProps) {
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  // Log the received data
  logger.debug('Displaying data:', data);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <pre className="whitespace-pre-wrap overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}