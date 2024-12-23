import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { SheetRow } from '../../types/sheets';
import { logger } from '../logger';

export async function exportToFirebase(data: SheetRow[][]) {
  try {
    // Add metadata to help with security rules
    const exportData = {
      timestamp: new Date().toISOString(),
      columns: data.map((column, index) => ({
        name: String.fromCharCode(65 + index),
        rows: column
      })),
      createdAt: new Date(),
      status: 'completed'
    };

    const docRef = await addDoc(collection(db, 'sheet_exports'), exportData);
    logger.debug('Document written with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    // Improve error messages for common Firebase errors
    if (error instanceof Error) {
      switch (error.name) {
        case 'FirebaseError':
          switch ((error as any).code) {
            case 'permission-denied':
              throw new Error('Permission denied. Please ensure you have write access to the database.');
            case 'unavailable':
              throw new Error('Firebase service is currently unavailable. Please try again later.');
            default:
              throw new Error(`Firebase error: ${(error as any).code}`);
          }
        default:
          throw error;
      }
    }
    throw error;
  }
}