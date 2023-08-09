import React from "react";
import { useGetSearchedBooksQuery } from "../redux/features/book/bookApi";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const SearchedResults = () => {
  const { searchtext } = useParams();
  console.log(searchtext, "from useparams");
  const filter = useAppSelector((state:RootState)=> state.filter)

  const { data } = useGetSearchedBooksQuery(searchtext);
  useEffect(() => {
    console.log("searched data", data);
  }, [data]);
  let filteredBooks;
  return (
    <div className="max-w-[1100px] m-auto mt-6">
      <h2 className="text-[25px] font-bold mb-5">Searched books</h2>
      <div className="grid bg-purple-200 grid-cols-4">
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
      ))
    ) : (
      <p>No books match the current filters.</p>
    ))}
</div>
    </div>
  );
};

export default SearchedResults;
