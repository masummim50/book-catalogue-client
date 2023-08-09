import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoute from './PrivateRoute';
import BookDetailsPage from './pages/BookDetailsPage';
import NotFound from './pages/NotFound';
import EditBookPage from './pages/EditBookPage';
import AllBooksPage from './pages/AllBooksPage';
import SearchPage from './pages/SearchPage';
import CardSkeleton from './ui/loadingSkeletons/CardSkeleton';


const AppRouter = () => {
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/skel' element={<CardSkeleton/>}/>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/books' element={<AllBooksPage/>}/>
                <Route path="/search/:searchtext" element={<SearchPage/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path='/add-book' element={<AddBookPage/>}/>
                    <Route path='/book/edit/:id' element={<EditBookPage/>}/>
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