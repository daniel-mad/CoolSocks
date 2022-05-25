import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './default.scss';
import {
  selectCurrentUser,
  userAdded,
  userRemoved,
} from './features/User/userSlice';
import { auth, handleUserProfile } from './firebase/utils';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';

import WithAuth from './hoc/withAuth';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        const {
          uid,
          displayName,
          email,
          reloadUserInfo: { lastLoginAt },
        } = userAuth;
        handleUserProfile(userAuth);

        dispatch(
          userAdded({
            id: uid,
            displayName,
            email,
            lastLoginAt,
          })
        );
      } else {
        dispatch(userRemoved());
      }
    });

    return () => authListener();
  }, []);
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <Homepage />
            </MainLayout>
          }
        />
        <Route
          path='/registration'
          element={
            <AuthLayout>
              <Registration />
            </AuthLayout>
          }
        />

        <Route
          path='/login'
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path='/recovery'
          element={
            <AuthLayout>
              <Recovery />
            </AuthLayout>
          }
        />
        <Route
          path='/dashboard'
          element={
            <WithAuth>
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            </WithAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
