// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB24QdKx5DnVKJj8_SkgXT0fHxgg6H4fyQ",
//   authDomain: "portfolio-6f701.firebaseapp.com",
//   projectId: "portfolio-6f701",
//   storageBucket: "portfolio-6f701.firebasestorage.app",
//   messagingSenderId: "266395010485",
//   appId: "1:266395010485:web:004110d1f13e67d26ac5fc",
//   measurementId: "G-9HMFTRBX2Q"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB24QdKx5DnVKJj8_SkgXT0fHxgg6H4fyQ",
  authDomain: "portfolio-6f701.firebaseapp.com",
  projectId: "portfolio-6f701",
  storageBucket: "portfolio-6f701.appspot.com", // ✅ FIXED
  messagingSenderId: "266395010485",
  appId: "1:266395010485:web:004110d1f13e67d26ac5fc",
  measurementId: "G-9HMFTRBX2Q"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);