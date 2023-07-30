import React, {useEffect} from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
    useEffect(()=> {
        setTimeout(() => {
            navigate("/")
        }, 1500);
    },[])
    return (
        <>
            <Header/>
            <div className="text-center font-bold text-[25px] text-red-500 mt-8">
                This page does not exists
                Redirecting in a second
            </div>
            
        </>
    );
};

export default NotFound;