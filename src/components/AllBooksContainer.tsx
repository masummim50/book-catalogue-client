import React from 'react';
import BookCard from './BookCard';
import { useGetBooksQuery } from '../redux/features/book/bookApi';
import { Ibook } from 'bookClub-client\src\components\BookCard';

const AllBooksContainer = () => {
    
  const {isLoading, isError, data, isSuccess} = useGetBooksQuery(undefined);
    return (
        <div className='max-w-[1100px] m-auto mt-6'>
            <h2 className='text-[25px] font-bold mb-5'>All Books</h2>
            <div className="grid bg-purple-200 grid-cols-4">
                {
                    data?.data?.map(book=> (
                        <BookCard book={book}/>
                    ))
                }
            </div>
        </div>
    );
};

export default AllBooksContainer;