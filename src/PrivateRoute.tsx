import React from 'react';
import { useAppSelector } from './redux/hooks';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const user = useAppSelector(state=> state.user);
    console.log('user', user)
    return (
        user.user? <Outlet/> : <Navigate to="/login"/>
    );
};

export default PrivateRoute;