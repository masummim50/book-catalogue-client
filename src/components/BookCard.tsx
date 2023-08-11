import React from 'react';
import { Link } from 'react-router-dom';

export interface Ibook{
    book: {
        _id:string,
    title:string,
    author:string,
    addedBy: {
        _id:string,
        name:string
    },
    date: Date
    }
}


const BookCard:React.FC<Ibook> = ({book}) => {
    return (
        <Link to={`/book/${book._id}`} key={book._id} className='bg-purple-200 border rounded mb-2 mx-2 p-2'>
                            <h2 className='text-[20px] font-bold title'>{book.title}</h2>
                            <span className='inline font-bold text-gray-500'>Author: </span>
                            <p className='inline font-thin'>{book.author}</p>
                            <br/>
                            <span className='inline font-bold text-gray-500'>Posted By: </span>
                            <p className='inline font-thin'>{book?.addedBy?.name}</p>
                            <br/>
                            <span className='inline font-bold text-gray-500 text-[12px]'>Published on: </span>
                            <p className='inline font-thin'>{new Date(book?.date).toDateString()}</p>

                        </Link>
    );
};

export default BookCard;