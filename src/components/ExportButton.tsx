import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { exportToFirebase } from '../utils/firebase/export';
import type { SheetRow } from '../types/sheets';

interface ExportButtonProps {
  data: SheetRow[][];
  disabled?: boolean;
}

export function ExportButton({ data, disabled }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);
    setSuccess(false);
    
    try {
      await exportToFirebase(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Clear success after 3s
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleExport}
        disabled={disabled || isExporting}
        className={`
          inline-flex items-center px-4 py-2 rounded-md text-sm font-medium
          ${disabled || isExporting
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : success
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'}
          transition-colors duration-200
        `}
      >
        <Upload className="h-4 w-4 mr-2" />
        {isExporting ? 'Exporting...' : success ? 'Exported!' : 'Export to Firebase'}
      </button>
      
      {error && (
        <div className="absolute top-full mt-2 w-64 p-2 text-sm text-red-600 bg-red-50 rounded shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}