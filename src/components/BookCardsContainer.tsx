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
const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    publicationDate: "July 11, 1960",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    publicationDate: "June 8, 1949",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    publicationDate: "April 10, 1925",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic Fiction",
    publicationDate: "January 28, 1813",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publicationDate: "July 29, 1954",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    publicationDate: "June 26, 1997",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming-of-Age Fiction",
    publicationDate: "July 16, 1951",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian Fiction",
    publicationDate: "January 1, 1932",
  },
  {
    title: "To the Lighthouse",
    author: "Virginia Woolf",
    genre: "Modernist Fiction",
    publicationDate: "May 5, 1927",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure Fiction",
    publicationDate: "October 18, 1851",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publicationDate: "September 21, 1937",
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Gothic Fiction",
    publicationDate: "June 20, 1890",
  },
  {
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    genre: "Dystopian Fiction",
    publicationDate: "September 17, 1985",
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Dystopian Fiction",
    publicationDate: "October 19, 1953",
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garcia Marquez",
    genre: "Magical Realism",
    publicationDate: "May 30, 1967",
  },
  {
    title: "The Odyssey",
    author: "Homer",
    genre: "Epic Poetry",
    publicationDate: "8th Century BCE",
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    genre: "Gothic Fiction",
    publicationDate: "January 1, 1818",
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    genre: "Historical Fiction",
    publicationDate: "September 1, 2005",
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Bronte",
    genre: "Gothic Fiction",
    publicationDate: "October 16, 1847",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophical Fiction",
    publicationDate: "1988",
  },
];

const BookCardsContainer = () => {
  let filteredBooks;
  const { isLoading, isError, data, isSuccess } =
    useGetRecentBooksQuery(undefined);
  const filter = useAppSelector((state: RootState) => state.filter);

  return (
    <div className="max-w-[1100px] m-auto mt-6">
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



      {/* </div> */}
    </div>
  );
};

export default BookCardsContainer;
