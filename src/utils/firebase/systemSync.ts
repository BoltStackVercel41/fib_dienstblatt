import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { Employee } from '../../types/employee';
import { logger } from '../logger';

export async function syncSystemData(employees: Employee[]) {
  try {
    const batch = employees.map(async (employee) => {
      await setDoc(
        doc(db, 'system', employee.serviceNumber),
        {
          ...employee,
          lastUpdated: new Date()
        }
      );
    });

    await Promise.all(batch);
    logger.debug('System data synced successfully');
  } catch (error) {
    logger.error('Error syncing system data:', error);
    throw error;
  }
}