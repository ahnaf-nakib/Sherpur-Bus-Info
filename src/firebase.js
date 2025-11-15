import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Check Admin
export async function isAdmin(email) {
  if (!email) return false;

  const docRef = doc(db, "admins", email); // Document ID = email
  const snap = await getDoc(docRef);

  return snap.exists();
}

// Optional: Create admin in Firebase Auth
export async function createAdmin(email, password) {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Admin user created:", userCred.user.email);
  } catch (err) {
    console.error("Error creating admin:", err);
  }
}
