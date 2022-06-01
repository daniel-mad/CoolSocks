import './default.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { checkUserSession } from './features/User/userSlice';

// components
import AdminToolbar from './components/AdminToolbar';

// hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Search from './pages/Search';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className='App'>
      <AdminToolbar />
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
          path='/search'
          element={
            <MainLayout>
              <Search />
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
        <Route
          path='/admin'
          element={
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
