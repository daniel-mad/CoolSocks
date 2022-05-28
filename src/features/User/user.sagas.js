import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { takeLatest, call, all, put } from 'redux-saga/effects';
import { getCurrentUser, handleUserProfile } from '../../firebase/utils';
import { handleResetPasswordAPI } from './user.helpers';
import {
  checkUserSession,
  emailSignInStart,
  googleSignInStart,
  resetPasswordStart,
  resetPasswordSuccess,
  signInSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signUpUserStart,
  userError,
} from './userSlice';

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield getDoc(userRef);

    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (err) {}
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const auth = getAuth();
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {}
}

export function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart.type, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (err) {}
}

export function* onCheckUserSession() {
  yield takeLatest(checkUserSession.type, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield signOut(getAuth());
    yield put(signOutUserSuccess());
  } catch (err) {}
}

export function* onSignOutUserStart() {
  yield takeLatest(signOutUserStart.type, signOutUser);
}

export function* signUpUser({
  payload: { displayName, email, password, passwordConfirm },
}) {
  if (password !== passwordConfirm) {
    const err = [`Password Don't Match`];
    yield put(userError(err));
    return;
  }
  try {
    const auth = getAuth();
    const { user } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch (err) {}
}

export function* onSignUpUserStart() {
  yield takeLatest(signUpUserStart.type, signUpUser);
}

export function* resetPassword({ payload: { email } }) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(resetPasswordSuccess(true));
  } catch (err) {
    yield put(userError(err));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(resetPasswordStart.type, resetPassword);
}

export function* googleSignIn() {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const { user } = yield signInWithPopup(auth, provider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {}
}

export function* onGoogleSignInStart() {
  yield takeLatest(googleSignInStart.type, googleSignIn);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
  ]);
}
