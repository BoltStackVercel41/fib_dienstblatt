import { GOOGLE_SHEETS_CONFIG } from '../../config/api';

export function buildSheetsUrl(spreadsheetId: string, apiKey: string): string {
  const { BASE_URL, SHEET_RANGE } = GOOGLE_SHEETS_CONFIG;
  return `${BASE_URL}/${spreadsheetId}/values/${SHEET_RANGE}?key=${apiKey}&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE`;
}