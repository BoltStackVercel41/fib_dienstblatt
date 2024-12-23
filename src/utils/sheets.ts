import { GOOGLE_SHEETS_CONFIG } from '../config/api';
import { fetchFromAPI } from './api';
import { transformSheetData } from './sheets/transform';
import { buildSheetsUrl } from './sheets/url';
import { logger } from './logger';
import type { Employee } from '../types/employee';

export async function fetchSheetData(): Promise<Employee[]> {
  try {
    const { API_KEY, SPREADSHEET_ID } = GOOGLE_SHEETS_CONFIG;
    const endpoint = buildSheetsUrl(SPREADSHEET_ID, API_KEY);
    
    logger.debug('Fetching sheet data from:', endpoint);
    const response = await fetchFromAPI<{ values?: string[][] }>(endpoint);
    
    if (!response.values) {
      logger.debug('No values found in sheet response');
      return [];
    }

    return transformSheetData(response);
  } catch (error) {
    logger.error('Error fetching sheet data:', error);
    throw new Error('Failed to fetch employee data. Please try again later.');
  }
}