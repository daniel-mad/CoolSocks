import { async } from '@firebase/util';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/utils';

export const handleAddProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productRef = doc(collection(db, 'products'));
      await setDoc(productRef, product);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const handleFetchProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const productsCol = collection(db, 'products');
      const snapshot = await getDocs(productsCol);
      const products = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          documentID: doc.id,
        };
      });
      resolve(products);
    } catch (err) {
      reject(err);
    }
  });
};

export const handleDeleteProduct = (documentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteDoc(doc(db, 'products', documentID));
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
