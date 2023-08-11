import React, { useEffect } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import Footer from '../components/Footer';

const LoginPage = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state:RootState)=> state.user.user.name)

    useEffect(()=> {
        if(user){
            navigate("/")
        }
    },[])
    return (
        <>
            <Header/>
            <Login/>
            <Footer/>
        </>
    );
};

export default LoginPage;