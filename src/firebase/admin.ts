import env from "@/env";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

const initFirebaseAdmin = () => {
  const apps = getApps();

  if (apps.length === 0) {
    initializeApp({
      credential:cert({
        projectId: env.firebase.projectId,
        // Replace the escaped newlines with actual newlines
        privateKey: env.firebase.server.privateKey?.replace(/\\n/g, '\n'),
        clientEmail: env.firebase.server.clientEmail
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore()
  }
}

export const { auth, db } = initFirebaseAdmin();