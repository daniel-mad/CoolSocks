import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { firebaseConfig } from './config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  signInWithPopup(auth, provider);
};

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = doc(db, `users/${uid}`);

  try {
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const { displayName, email } = userAuth;
      const timestamp = new Date().toLocaleDateString();
      await setDoc(userRef, {
        displayName,
        email,
        createdAt: timestamp,
        ...additionalData,
      });
    }
  } catch (err) {
    console.log(err);
  }
  return userRef;
};
