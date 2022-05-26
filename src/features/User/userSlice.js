import { createSlice } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { handleUserProfile } from '../../firebase/utils';

const initialState = {
  currentUser: null,
  signInSuccess: false,
  signUpSuccess: false,
  signUpError: [],
  resetPasswordSuccess: false,
  resetPasswordError: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAdded: (state, action) => {
      state.currentUser = action.payload;
    },
    userRemoved: () => initialState,
    signInSuccess: (state, action) => {
      state.signInSuccess = action.payload;
    },
    signUpSuccess: (state, action) => {
      state.signUpSuccess = action.payload;
    },
    signUpError: (state, action) => {
      state.signUpError = action.payload;
    },
    resetPasswordSuccess: (state, action) => {
      state.resetPasswordSuccess = action.payload;
    },
    resetPasswordError: (state, action) => {
      state.resetPasswordError = action.payload;
    },
  },
});

export const {
  userAdded,
  userRemoved,
  signInSuccess,
  signUpError,
  signUpSuccess,
  resetPasswordSuccess,
  resetPasswordError,
} = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectSignIn = (state) => state.user.signInSuccess;

// Thunks
export const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(signInSuccess(true));
    } catch (err) {
      dispatch(signInSuccess(false));
    }
  };

export const signUpUser =
  ({ displayName, email, password, passwordConfirm }) =>
  async (dispatch) => {
    if (password !== passwordConfirm) {
      const err = [`Password Dont't Match`];
      dispatch(signUpError(err));
      return;
    }
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      dispatch(signUpSuccess(true));
    } catch (err) {}
  };

export const resetPassword =
  ({ email }) =>
  async (dispatch) => {
    const config = {
      url: 'http://localhost:3000/login',
    };

    try {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email, config)
        .then(() => {
          dispatch(resetPasswordSuccess(true));
        })
        .catch(() => {
          const err = ['Email not found. Please try again.'];
          dispatch(resetPasswordError(err));
        });

      // navigate('/login');
    } catch (err) {}
  };

export const signInWithGoogle = () => async (dispatch) => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithPopup(auth, provider);
    dispatch(signInSuccess(true));
  } catch (err) {}
};
