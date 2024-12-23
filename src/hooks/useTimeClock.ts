import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { TimeClockEntry } from '../types/employee';

export function useTimeClock() {
  const [activeEmployees, setActiveEmployees] = useState<TimeClockEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'timeClock'),
      where('status', '==', 'active')
    );

    return onSnapshot(q, (snapshot) => {
      setActiveEmployees(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          checkIn: doc.data().checkIn.toDate(),
          checkOut: doc.data().checkOut?.toDate()
        } as TimeClockEntry))
      );
    });
  }, []);

  const checkIn = async (employeeId: string) => {
    setIsChecking(true);
    setError(null);
    
    try {
      // Check if already checked in
      const activeQuery = query(
        collection(db, 'timeClock'),
        where('employeeId', '==', employeeId),
        where('status', '==', 'active')
      );
      
      const snapshot = await getDocs(activeQuery);
      if (!snapshot.empty) {
        throw new Error('Agent is already checked in');
      }

      await addDoc(collection(db, 'timeClock'), {
        employeeId,
        checkIn: new Date(),
        status: 'active'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check-in failed');
    } finally {
      setIsChecking(false);
    }
  };

  const checkOut = async (employeeId: string) => {
    setError(null);
    
    try {
      const q = query(
        collection(db, 'timeClock'),
        where('employeeId', '==', employeeId),
        where('status', '==', 'active')
      );
      
      const snapshot = await getDocs(q);
      const doc = snapshot.docs[0];
      
      if (doc) {
        await updateDoc(doc.ref, {
          checkOut: new Date(),
          status: 'inactive'
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Check-out failed');
    }
  };

  return { activeEmployees, checkIn, checkOut, error, isChecking };
}