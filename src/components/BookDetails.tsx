// import React from 'react';
import { useEffect, useState } from "react";
import {
  useAddBookToReadingListMutation,
  useAddBookToWishlistMutation,
  useDeleteBookByIdMutation,
  useGetBookByIdQuery,
  useRemoveBookFromReadingListMutation,
  useRemoveBookFromWishlistMutation,
} from "../redux/features/book/bookApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import ReviewSection from "./ReviewSection";
import ReviewSlider from "./ReviewSlider";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBook, BsBookFill } from "react-icons/bs";
import { useGetListsQuery } from "../redux/features/user/userApi";
import DetailsSkeleton from "../ui/loadingSkeletons/DetailsSkeleton";
import DotLoading from "../ui/DotLoading";
import { wishlistBook } from "./Wishlist";

const BookDetails = () => {
  // if book deletion is success then invisible the whole thing, and show a deletion message and redirect
  const { id } = useParams();
  const navigate = useNavigate();
  const [hideDetails, setHideDetails] = useState(false);
  const user = useAppSelector((state: RootState) => state.user.user);
  const { isSuccess, data, isLoading } = useGetBookByIdQuery(id);

  const { data: lists } = useGetListsQuery(undefined);

  const [addBookToWishlist, {isLoading:addtowishlistLoading}] = useAddBookToWishlistMutation();
  const [addBookToReadingList, {isLoading:addtoreadinglistLoading}] = useAddBookToReadingListMutation();
  const [removeBookFromWishlist, {isLoading:removefromwishlistLoading}] = useRemoveBookFromWishlistMutation();
  const [removeFromReadingList, {isLoading:removefromreadinglistLoading}] = useRemoveBookFromReadingListMutation();

  const [deleteBook, { isSuccess: deleteSuccess, isLoading:isdeletingbook }] =
    useDeleteBookByIdMutation();

  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const handleDelete = () => {
    setShowConfirmDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    deleteBook(id);
  };
  const handleCancelDelete = () => {
    setShowConfirmDeletePopup(false);
  };
  // run another useeffect to see if the book deleted successfully
  useEffect(() => {
    if (deleteSuccess) {
      setShowConfirmDeletePopup(false);
      setHideDetails(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [deleteSuccess, navigate]);
  // console.log the book data

  const handleAddToWishlist = () => {
    console.log("handle add to wish list clicked");
    addBookToWishlist(id);
  };
  const handleRemoveBookFromWishlist = () => {
    console.log("removing");
    removeBookFromWishlist(id);
  };
  const handleAddToReadingList = () => {
    console.log("handle add to wish list clicked");
    addBookToReadingList(id);
  };
  const handleRemoveFromReadingList = () => {
    console.log("handle add to wish list clicked");
    removeFromReadingList(id);
  };

  return (
    <>
      {isLoading && (
        <div className={`mt-5 max-w-[1100px] px-2 m-auto`}>
          <DetailsSkeleton />
        </div>
      )}
      {/* show the delete message here */}
      {hideDetails && deleteSuccess && (
        <>
          <h2 className="text-center text-red-700 text-[30px]">
            Book Deleted Successfully
          </h2>
          <p>Redirecting to homepage in a second</p>
        </>
      )}
      {isSuccess && (
        <div
          className={`mt-5 max-w-[1100px] px-2 m-auto min-h-[60vh] ${
            hideDetails && "invisible"
          }`}
        >
          <div className="bg-gradient-to-r from-purple-200 via-white to-white max-w-[1100px] m-auto mb-2 p-3 rounded-lg">
            Book Details:
          </div>
          <div className="bg-gradient-to-br mb-3 from-purple-100 via-blue-100 to-purple-300 max-w-[1100px] m-auto p-3 rounded-lg shadow-md">
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
          <div className="flex flex-start my-2">
          {
            (addtowishlistLoading || addtoreadinglistLoading || removefromwishlistLoading || removefromreadinglistLoading) && 
            <DotLoading size={"10px"}/>
          }
          </div>
          {user.email && (
            <>
              {lists?.data?.wishlist?.find((book:wishlistBook) => book._id._id === id) ? (
                <button
                  disabled={removefromwishlistLoading}
                  onClick={() => handleRemoveBookFromWishlist()}
                  className="bg-red-400  px-3 py-2 rounded-md hover:bg-red-600 font-bold text-white disabled:bg-purple-100"
                >
                  Remove From WishList{" "}
                  <AiFillHeart className="inline text-white" />
                </button>
              ) : (
                <button
                disabled={addtowishlistLoading}
                  onClick={() => handleAddToWishlist()}
                  className="bg-green-100 px-3 py-2 mr-2 rounded-md hover:bg-green-200 font-bold disabled:bg-purple-100"
                >
                  Add To WishList{" "}
                  <AiOutlineHeart className="inline text-green-900" />
                </button>
              )}

              {lists?.data?.reading?.find((book:wishlistBook) => book._id._id === id) ? (
                <button
                disabled={removefromreadinglistLoading}
                  onClick={() => handleRemoveFromReadingList()}
                  className="bg-red-400 px-3 py-2 rounded-md hover:bg-red-600 font-bold text-white disabled:bg-purple-100"
                >
                  Remove From Reading List{" "}
                  <BsBookFill className="inline  text-white" />
                </button>
              ) : (
                <button
                disabled={addtoreadinglistLoading}
                  onClick={() => handleAddToReadingList()}
                  className="bg-green-100 px-3 mr-2 py-2 rounded-md hover:bg-green-200 font-bold disabled:bg-purple-100"
                >
                  Add To Reading List{" "}
                  <BsBook className="inline text-green-900" />
                </button>
              )}
            </>
          )}
          {/* delete confirm option */}
          <div
            className={`${
              showConfirmDeletePopup ? "" : "invisible"
            } h-full bg-gray-100 absolute top-0 left-0 text-center w-full opacity-70 z-10 flex items-center flex-col justify-center`}
          >
            <p className="font-bold mb-2">
              Are you sure you want to delete this book?
            </p>
            {
              isdeletingbook && <DotLoading size={"10px"}/>
            }
            <div className="mt-2">
              <button
                onClick={() => handleConfirmDelete()}
                className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg mr-2 hover:bg-red-800 "
              >
                Delete Book
              </button>
              <button
                onClick={() => handleCancelDelete()}
                className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg mr-2 hover:bg-green-800"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* the delete and remove Button */}
          {data.data.addedBy._id === user._id && (
            <div className="mt-3">
              <Link
                to={`/book/edit/${id}`}
                className="bg-purple-300 px-4 py-2 rounded-lg hover:bg-purple-400 mr-2"
              >
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
          <h2 className="font-bold mt-2">Reviews: </h2>
          {
            data?.data?.reviews.length <1 && <p>No reviews</p>
          }
          <ReviewSlider reviews={data.data.reviews} />
          <br/>
        </div>
      )}
    </>
  );
};

export default BookDetails;
