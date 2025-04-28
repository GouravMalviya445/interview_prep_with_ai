// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import env from "@/env";

const firebaseConfig = {
  apiKey: env.firebase.client.apiKey,
  authDomain: env.firebase.client.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.client.storageBucket,
  messagingSenderId: env.firebase.client.messagingSenderId,
  appId: env.firebase.client.appId,
  measurementId: env.firebase.client.measurementId
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app); 