import { useState, useEffect } from 'react';
import { fetchSheetData } from '../utils/sheets';
import { syncSystemData } from '../utils/firebase/systemSync';
import type { Employee } from '../types/employee';

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadAndSyncData = async () => {
      try {
        const data = await fetchSheetData();
        setEmployees(data);
        await syncSystemData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    // Initial load
    loadAndSyncData();

    // Set up interval for periodic sync
    const intervalId = setInterval(loadAndSyncData, 60000); // 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  return { employees, isLoading, error };
}