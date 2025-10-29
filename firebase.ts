import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// WARNING: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp5rKmAfCI6SSZpZsdwWdFYc-sj-iW0Nk",
  authDomain: "hostelinsight.firebaseapp.com",
  projectId: "hostelinsight",
  storageBucket: "hostelinsight.firebasestorage.app",
  messagingSenderId: "249633812839",
  appId: "1:249633812839:web:19adff3ec0d60f1c6b3fc2",
  measurementId: "G-7MB7EJ3K7T"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// This check is crucial. It prevents the app from crashing if you haven't added your credentials yet.
export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith("REPLACE_WITH");

if (isFirebaseConfigured) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }
} else {
    console.warn("Firebase is not configured. Please add your Firebase credentials to firebase.ts to connect to the backend.");
}

export { app, auth, db };