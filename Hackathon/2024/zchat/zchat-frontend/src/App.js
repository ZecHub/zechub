import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/zcash/Login';
import Register from './components/auth/zcash/Register';
// import Chat from './components/Chat';
// import ListUsers from './components/ListUsers';
// import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Background from './components/zcash/Background';
import PopUp from './components/zcash/PopUp';
import Transactions from './components/zcash/transactions/Transactions';
import Dashboard from './components/zcash/dashboard/Dashboard';
import Wallet from './components/zcash/wallet/Wallet';
import Profile from './components/zcash/profile/Profile';
import Markets from './components/zcash/markets/Market';
import Settings from './components/zcash/settings/Settings';
import Help from './components/zcash/help/Help';
import Logout from './components/zcash/logout/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/chat/:username" element={<ProtectedRoute element={<Chat />} />} />  */}
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/messages" element={<ProtectedRoute element={<Background />} />} />
        <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
        <Route path="/wallet" element={<ProtectedRoute element={<Wallet />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/markets" element={<ProtectedRoute element={<Markets />} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
        <Route path="/help" element={<ProtectedRoute element={<Help />} />} />
        <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />
        {/* Other routes */}
        {/* <Route path="/" element={<Background />} /> */}
        <Route path="/pop" element={<PopUp />} />
      </Routes>
    </Router>
  );
};

export default App;
