import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import HomePage from './pages/HomePage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path="/add-book" element={<AddBookPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;