import React from 'react';
import BookCard from './BookCard';
import { useGetBooksQuery } from '../redux/features/book/bookApi';
import { Ibook } from 'bookClub-client\src\components\BookCard';
import CardSkeleton from '../ui/loadingSkeletons/CardSkeleton';

const AllBooksContainer = () => {
    
  const {isLoading, isError, data, isSuccess} = useGetBooksQuery(undefined);
    return (
        <div className='max-w-[1100px] m-auto mt-6 min-h-[50vh]'>
            <h2 className='text-[25px] font-bold mb-5'>All Books</h2>
            <div className="grid  grid-cols-4">
                {
                    isLoading && Array(10).fill("").map(skeleton=> (
                        <CardSkeleton/>
                    ))
                }
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