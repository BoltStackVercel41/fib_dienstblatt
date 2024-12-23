import { useState, useEffect } from 'react';
import { fetchSheetData } from '../utils/sheets';
import type { SheetRow } from '../types/sheets';

export function useSheetData() {
  const [data, setData] = useState<SheetRow[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sheetData = await fetchSheetData();
        setData(sheetData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, isLoading, error };
}