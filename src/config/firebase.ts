import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAb5ImbpiV8ig6BFzlbYvDR2tbkgrh8f44",
  authDomain: "fib-dienstblatt-13fe5.firebaseapp.com",
  projectId: "fib-dienstblatt-13fe5",
  storageBucket: "fib-dienstblatt-13fe5.firebasestorage.app",
  messagingSenderId: "692584602503",
  appId: "1:692584602503:web:c5a2283c5ad293b6dc1122",
  measurementId: "G-MVVJHTB9XS"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize auth with persistence
auth.useDeviceLanguage();