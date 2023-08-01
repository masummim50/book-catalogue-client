import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './PrivateRoute';
import BookDetailsPage from './pages/BookDetailsPage';
import NotFound from './pages/NotFound';


const AppRouter = () => {
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path='/add-book' element={<AddBookPage/>}/>
                </Route>
                <Route path="/book/:id" element={<BookDetailsPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;