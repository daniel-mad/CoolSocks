import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userAdded: (state, action) => {
      state.currentUser = action.payload;
    },
    userRemoved: (state) => {
      state.currentUser = null;
    },
  },
});

export const { userAdded, userRemoved } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.currentUser;
