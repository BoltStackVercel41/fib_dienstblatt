import React from 'react';
import type { SheetRow } from '../types/sheets';
import { Grid } from 'lucide-react';
import { ExportButton } from './ExportButton';

interface GridDisplayProps {
  data: SheetRow[][];
  isLoading: boolean;
  error: Error | null;
}

export function GridDisplay({ data, isLoading, error }: GridDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Grid className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-700">Sheet Data</h2>
        </div>
        <ExportButton data={data} disabled={data.length === 0} />
      </div>
      
      <div className="overflow-x-auto">
        <div className="grid gap-4 p-4">
          {data.slice(0, 10).map((column, colIndex) => (
            <div 
              key={colIndex}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="mb-3 font-medium text-gray-700">
                Column {String.fromCharCode(65 + colIndex)} (1-100)
              </div>
              <div className="grid gap-2">
                {column.map((cell, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="bg-white p-2 rounded shadow-sm flex items-center"
                  >
                    <span className="w-16 text-sm text-gray-500">
                      Row {rowIndex + 1}:
                    </span>
                    <span className="text-sm text-gray-900 ml-2">
                      {cell[`Row ${rowIndex + 1}`] || '-'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}