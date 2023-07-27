import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import Account from './pages/Account';
import Settings from './pages/Settings';
import NewUsers from './pages/Users';
import Cabins from './pages/Cabins';
import Bookings from './pages/Bookings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="dashboard"
          element={<Dashboard />}
        />
        <Route
          path="bookings"
          element={<Bookings />}
        />
        <Route
          path="cabins"
          element={<Cabins />}
        />
        <Route
          path="users"
          element={<NewUsers />}
        />
        <Route
          path="settings"
          element={<Settings />}
        />
        <Route
          path="account"
          element={<Account />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
