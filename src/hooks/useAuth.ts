import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../utils/firebase/auth';
import { useEmployees } from './useEmployees';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { employees } = useEmployees();

  // Find matching employee by email (case-insensitive)
  const linkedEmployee = user?.email 
    ? employees.find(emp => 
        emp.email?.toLowerCase().trim() === user.email?.toLowerCase().trim()
      )
    : undefined;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user?.email);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { 
    user, 
    loading, 
    linkedEmployee,
    isAuthenticated: !!user && !!linkedEmployee 
  };
}