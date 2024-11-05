import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { UserProvider } from './hooks/UserContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import Profile from './components/Profile';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </UserProvider>

  );
};

export default App;
