import { getAuth } from 'firebase/auth';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
  handleAddProduct,
  handleDeleteProduct,
  handleFetchProducts,
} from './products.helpers';
import {
  addProductStart,
  deleteProductStart,
  fetchProductsStart,
  setProducts,
} from './productsSlice';

export function* addProduct({
  payload: { productCategory, productName, productThumbnail, productPrice },
}) {
  try {
    const timestamp = Date.now();
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productAdminUserUID: getAuth().currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
    // console.log(err);
  }
}

export function* onAddProductStart() {
  yield takeLatest(addProductStart.type, addProduct);
}

export function* fetchProducts() {
  try {
    const products = yield handleFetchProducts();
    yield put(setProducts(products));
  } catch (err) {
    // console.log(err)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(fetchProductsStart.type, fetchProducts);
}

export function* deleteProduct({ payload: { documentID } }) {
  try {
    yield handleDeleteProduct(documentID);
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(deleteProductStart.type, deleteProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
  ]);
}
