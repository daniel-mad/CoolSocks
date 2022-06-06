import { async } from '@firebase/util';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
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

export const handleFetchProducts = ({ filters }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productsCol = collection(db, 'products');
      let q = query(productsCol, orderBy('createdDate'));
      if (filters)
        q = query(
          productsCol,
          where('productCategory', '==', filters),
          orderBy('createdDate')
        );

      const snapshot = await getDocs(q);
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
