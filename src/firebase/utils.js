import { firebaseConfig } from './config';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = doc(db, `users/${uid}`);

  try {
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const { displayName, email } = userAuth;
      const timestamp = new Date().toLocaleDateString();
      const userRoles = ['user'];

      await setDoc(userRef, {
        displayName,
        email,
        createdAt: timestamp,
        userRoles,
        ...additionalData,
      });
    }
  } catch (err) {
    console.log(err);
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
