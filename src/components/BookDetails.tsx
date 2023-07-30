// import React from 'react';
import { useEffect } from 'react';
import { useGetBookByIdQuery } from '../redux/features/book/bookApi';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';

const BookDetails = () => {
    const user = useAppSelector((state:RootState)=> state.user.user)
    const {id} = useParams()
    const { isSuccess, data} = useGetBookByIdQuery(id)
    // console.log the book data
    useEffect(()=> {
        console.log(data)
    },[data])
    return (
        <>
            {
                isSuccess && 
                <div className='mt-5 max-w-[1100px] px-2 m-auto'>
                <div className="bg-gradient-to-r from-purple-200 via-white to-white max-w-[1100px] m-auto mb-2 p-3 rounded-lg">
                    Book Details:
                </div>
                <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-purple-300 max-w-[1100px] m-auto p-3 rounded-lg shadow-md">
                    <h2 className='text-[35px] font-bold'>{data.data.title}</h2>
                    <span className="font-thin">Author: </span>
                    <p className='inline font-semibold'>{data.data.author}</p>
                    <br/>
                    <span className="font-thin">Genre: </span>
                    <p className='inline font-semibold'>{data.data.genre}</p>
                    <br/>
                    <span className="font-thin">Posted By: </span>
                    <p className='inline font-semibold'>{data.data.addedBy.name}</p>
                    
                    <br/>
                    <span className="font-thin">Publication Date: </span>
                    <p className='inline font-semibold'>{new Date(data.data.date).toDateString()}</p>
                </div>
                 {/* the delete and remove Button */}

                {
                    data.data.addedBy._id === user._id &&
                <div className="mt-3">
                    <button className='bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2'>Edit</button>
                    <button className='bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2'>Delete</button>
                </div>
                }
                 {/* add or edit your review */}
                 <div className="mt-3">
                    {
                        data.data.reviews.find((review)=> review._id === user._id)
                         ?
                         <button className='bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2'>Edit Your Review</button>
                         :
                         <button className='bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2'>Add A Review+</button>
                }
                </div>
    
                 {/* The review slider */}
                </div>
            }
        </>  
    );
};

export default BookDetails;