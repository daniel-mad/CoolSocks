import { Route, Routes } from 'react-router-dom';
import './default.scss';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Homepage />
            </MainLayout>
          }
        />
        <Route
          path="/registration"
          element={
            <MainLayout>
              <Registration />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
