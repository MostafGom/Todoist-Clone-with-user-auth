import { useState } from "react";
import { AuthProvider } from './context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Privateroute from './components/auth/PrivateRoute';
import AlreadyLogged from './components/auth/AlreadyLogged';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from "./components/layout/Dashboard";

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (


    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Privateroute><Dashboard /></Privateroute>} />
          <Route exact path='/signup' element={<AlreadyLogged><Signup /></AlreadyLogged>} />
          <Route exact path='/login' element={<AlreadyLogged> <Login /></AlreadyLogged>} />
          <Route exact path='/forgot-password' element={<AlreadyLogged> <ForgotPassword /></AlreadyLogged>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};


