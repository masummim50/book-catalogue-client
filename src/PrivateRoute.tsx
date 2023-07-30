import React from 'react';
import { useAppSelector } from './redux/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './redux/store';

const PrivateRoute = () => {
    const user = useAppSelector((state:RootState)=> state.user.user.name);
    console.log("just state.user", user)
    console.log('user', user)
    return (
        user ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default PrivateRoute;