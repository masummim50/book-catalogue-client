/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import "./elipsis.css";
import {
  useGetBooksQuery,
  useGetRecentBooksQuery,
} from "../redux/features/book/bookApi";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import CardSkeleton from "../ui/loadingSkeletons/CardSkeleton";


const BookCardsContainer = () => {
  let filteredBooks;
  const { isLoading, isError, data, isSuccess } =
    useGetRecentBooksQuery(undefined);
  const filter = useAppSelector((state: RootState) => state.filter);

  return (
    <div className="max-w-[1100px] m-auto mt-6  min-h-[100vh]">

      <h2 className="text-[25px] font-bold mb-5">Recently Added Books</h2>
      {/* <div className="grid bg-purple-200 grid-cols-4"> */}
        {/* {data?.data
          ?.filter((book) => {
            if (filter.genre) {
              return book.genre === filter.genre;
            } else {
              return book;
            }
          })
          .filter((book) => {
            if (filter.year) {
              const bookYear = new Date(book.date).getFullYear();
              return bookYear.toString() === filter.year;
            } else {
              return book;
            }
          })
          .map((book) => (
            <Link
              to={`/book/${book._id}`}
              key={book._id}
              className="bg-white border rounded mb-2 mx-2 p-2"
            >
              <h2 className="text-[20px] font-bold title">{book.title}</h2>
              <span className="inline font-bold text-gray-500">Author: </span>
              <p className="inline font-thin">{book.author}</p>
              <br />
              <span className="inline font-bold text-gray-500">
                Posted By:{" "}
              </span>
              <p className="inline font-thin">{book?.addedBy?.name}</p>
            </Link>
          ))} */}



<div className="grid grid-cols-4">
  {
    isLoading && Array(10).fill(" ").map(a=> (
      <CardSkeleton/>
    ))
  }
  {data?.data &&
    ((filteredBooks = data.data.filter((book) => {
      if (filter.genre && book.genre !== filter.genre) {
        return false;
      }
      if (filter.year) {
        const bookYear = new Date(book.date).getFullYear();
        if (bookYear.toString() !== filter.year) {
          return false;
        }
      }
      return true;
    })),
    filteredBooks.length > 0 ? (
      filteredBooks.map((book) => (
        <Link
          to={`/book/${book._id}`}
          key={book._id}
          className="bg-purple-100 border rounded mb-2 mx-2 p-2"
        >
          <h2 className="text-[20px] font-bold title">{book.title}</h2>
          <span className="inline font-bold text-gray-500">Author: </span>
          <p className="inline font-thin">{book.author}</p>
          <br />
          <span className="inline font-bold text-gray-500">
            Posted By:{" "}
          </span>
          <p className="inline font-thin">{book?.addedBy?.name}</p>
        </Link>
      ))
    ) : (
      <p>No books match the current filters.</p>
    ))}
</div>



      {/* </div> */}
    </div>
  );
};

export default BookCardsContainer;
