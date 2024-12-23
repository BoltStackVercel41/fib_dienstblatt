import { GOOGLE_SHEETS_CONFIG } from '../config/api';
import { logger } from './logger';

interface APIError {
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      const errorData: APIError = await response.json();
      throw new Error(
        errorData.error?.message || 
        `HTTP Error: ${response.status} ${response.statusText}`
      );
    }
    
    const data = await response.json();
    
    if (!data) {
      throw new Error('No data received from API');
    }
    
    return data;
  } catch (error) {
    logger.error('API Request failed:', error);
    if (error instanceof Error) {
      throw new Error(`API Request Failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching data');
  }
}