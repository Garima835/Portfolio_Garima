import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB24QdKx5DnVKJj8_SkgXT0fHxgg6H4fyQ",
//   authDomain: "portfolio-6f701.firebaseapp.com",
//   projectId: "portfolio-6f701",
//   storageBucket: "portfolio-6f701.appspot.com", // ✅ FIXED
//   messagingSenderId: "266395010485",
//   appId: "1:266395010485:web:004110d1f13e67d26ac5fc",
//   measurementId: "G-9HMFTRBX2Q"
// };
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

