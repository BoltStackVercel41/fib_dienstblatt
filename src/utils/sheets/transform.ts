import type { Employee } from '../../types/employee';
import { logger } from '../logger';

interface RawSheetData {
  values?: string[][];
}

export function transformSheetData(data: RawSheetData): Employee[] {
  if (!data.values || data.values.length < 2) {
    logger.debug('No data found in sheet');
    return [];
  }

  try {
    // Skip header row (index 0)
    return data.values.slice(1).map((row, index) => {
      if (!row[0] || !row[1]) {
        logger.debug(`Skipping invalid row at index ${index + 1}`);
        return null;
      }

      return {
        name: row[0] || '',
        serviceNumber: row[1] || '',
        rank: parseInt(row[2] || '0', 10),
        phone: row[3] || '',
        insuranceId: row[4] || '',
        email: row[5] || '' // Added email from column F
      };
    }).filter((employee): employee is Employee => employee !== null);
  } catch (error) {
    logger.error('Error transforming sheet data:', error);
    throw new Error('Failed to process employee data');
  }
}