import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {LoginPage} from "./pages/LoginPage";

export const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem('token');
    const location = useLocation();
    if (!token) {
        if (children.type === LoginPage) {
            return children;
        }
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    console.log(token)
    if (token && children.type === LoginPage) {
        return <Navigate to="/" replace />;
    }

    return children;
};