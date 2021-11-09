import firebase, { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite'
let app: firebase.FirebaseApp;

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const apps = getApps();
if (!apps.length) {
  app = initializeApp(config);
} else {
  app = apps[0];
}

const firestore = getFirestore(app);

export { firestore, config, app }