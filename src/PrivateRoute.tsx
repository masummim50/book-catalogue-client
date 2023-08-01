import React from 'react';
import { useAppSelector } from './redux/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from './redux/store';

const PrivateRoute = () => {
    const user = useAppSelector((state:RootState)=> state.user.user.name);

    const prevLocation = useLocation();
    console.log("from private route", prevLocation)
    return (
        user ? <Outlet/> : <Navigate state={prevLocation.pathname} to="/login"/>
    );
};

export default PrivateRoute;