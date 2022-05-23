import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './default.scss';
import { auth, handleUserProfile } from './firebase/utils';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    (async () => {
      const authListener = onAuthStateChanged(auth, userAuth => {
        if (userAuth) {
          const {
            uid,
            displayName,
            email,
            reloadUserInfo: { lastLoginAt },
          } = userAuth;
          handleUserProfile(userAuth);
          setCurrentUser({
            id: uid,
            displayName,
            email,
            lastLoginAt,
          });
        } else {
          setCurrentUser(null);
        }
      });

      return () => authListener();
    })();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout currentUser={currentUser}>
              <Homepage />
            </MainLayout>
          }
        />
        <Route
          path="/registration"
          element={
            currentUser ? (
              <Navigate replace to="/" />
            ) : (
              <AuthLayout currentUser={currentUser}>
                <Registration />
              </AuthLayout>
            )
          }
        />

        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate replace to="/" />
            ) : (
              <AuthLayout currentUser={currentUser}>
                <Login />
              </AuthLayout>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
