// import React from 'react';
import { useEffect, useState } from "react";
import {
  useDeleteBookByIdMutation,
  useGetBookByIdQuery,
} from "../redux/features/book/bookApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import ReviewSection from "./ReviewSection";
import ReviewSlider from "./ReviewSlider";

const BookDetails = () => {
  // if book deletion is success then invisible the whole thing, and show a deletion message and redirect
  const navigate = useNavigate()
  const [hideDetails, setHideDetails] = useState(false);
  const user = useAppSelector((state: RootState) => state.user.user);
  const { id } = useParams();
  const { isSuccess, data } = useGetBookByIdQuery(id);
  const [deleteBook, { isSuccess: deleteSuccess }] =
    useDeleteBookByIdMutation();
  const handleDelete = () => {
    deleteBook(id);
  };
  // run another useeffect to see if the book deleted successfully
  useEffect(()=> {
    if(deleteSuccess){
      setHideDetails(true);
      setTimeout(() => {
        navigate("/")
      }, 1000);
    }
  },[deleteSuccess])
  // console.log the book data
  useEffect(() => {
    console.log(data);
  }, [data]);


  return (
    <>
    {/* show the delete message here */}
    {
      (hideDetails && deleteSuccess) && <>
        <h2 className="text-center text-red-700 text-[30px]">
          Book Deleted Successfully
        </h2>
        <p>Redirecting to homepage in a second</p>
      </>
    }
      {isSuccess && (
        <div className={`mt-5 max-w-[1100px] px-2 m-auto ${hideDetails && "invisible"}`}>
          <div className="bg-gradient-to-r from-purple-200 via-white to-white max-w-[1100px] m-auto mb-2 p-3 rounded-lg">
            Book Details:
          </div>
          <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-purple-300 max-w-[1100px] m-auto p-3 rounded-lg shadow-md">
            <h2 className="text-[35px] font-bold">{data.data.title}</h2>
            <span className="font-thin">Author: </span>
            <p className="inline font-semibold">{data.data.author}</p>
            <br />
            <span className="font-thin">Genre: </span>
            <p className="inline font-semibold">{data.data.genre}</p>
            <br />
            <span className="font-thin">Posted By: </span>
            <p className="inline font-semibold">{data.data.addedBy.name}</p>

            <br />
            <span className="font-thin">Publication Date: </span>
            <p className="inline font-semibold">
              {new Date(data.data.date).toDateString()}
            </p>
          </div>
          {/* the delete and remove Button */}

          {data.data.addedBy._id === user._id && (
            <div className="mt-3">
              <Link to={`/book/edit/${id}`} className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2">
                Edit
              </Link>
              <button
                onClick={() => handleDelete()}
                className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2"
              >
                Delete
              </button>
            </div>
          )}
          {/* add or edit your review */}
          {user.email && <ReviewSection reviews={data.data.reviews} />}

          {/* The review slider */}
          <ReviewSlider reviews={data.data.reviews} />
        </div>
      )}
    </>
  );
};

export default BookDetails;
