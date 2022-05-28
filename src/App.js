import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './default.scss';
import { checkUserSession } from './features/User/userSlice';
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

  useEffect(() => {
    dispatch(checkUserSession());
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
