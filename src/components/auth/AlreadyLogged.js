import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context';

function AlreadyLogged({ children }) {
    const { currentUser } = useAuth();
    return !currentUser ? children : <Navigate to="/" />
}


export default AlreadyLogged;
