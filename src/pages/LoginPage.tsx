import React, { useEffect } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

const LoginPage = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state:RootState)=> state.user)

    useEffect(()=> {
        if(user?.user){
            navigate("/")
        }
    },[])
    return (
        <>
            <Header/>
            <Login/>
        </>
    );
};

export default LoginPage;