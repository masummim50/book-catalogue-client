import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './PrivateRoute';


const AppRouter = () => {
    console.log("rendering approuter")
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path='/add-book' element={<AddBookPage/>}/>
                </Route>
                
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;