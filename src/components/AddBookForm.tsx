/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../redux/features/book/bookApi";
import DotLoading from "../ui/DotLoading";

type FormData = {
  title: string;
  author: string;
  genre: string;
  date: string;
};
export const bookGenres = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Thriller",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Historical Fiction",
  "Biography",
  "Autobiography",
  "Self-Help",
  "Horror",
  "Adventure",
  "Poetry",
  "Drama",
  "Comedy",
  "Children's",
  "Young Adult",
  "Classic",
  "Crime",
  "Graphic Novel",
];

export default function AddBookForm() {

  const [success, setSuccess] = useState(false);
  const [addBook, {isSuccess, isLoading, isError}] =
    useAddBookMutation();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    addBook(data)
  });

  // to show success message
 
  useEffect(()=> {
    if(isSuccess){
      setSuccess(true)
      reset()
      setTimeout(() => {
        setSuccess(false)
      }, 1000);
    }
  }, [isSuccess, reset])

  return (
    <div className="mx-auto w-[600px] min-h-[60vh]">
      <form onSubmit={onSubmit}>
        <label className="block">Book Title</label>
        <input
          required
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Title"
          {...register("title")}
        />

        <label className="block">Book Author</label>
        <input
        required
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Author"
          {...register("author")}
        />
        <label className="block">Book Genre</label>
        <select className="border rounded focus:outline-none py-2 w-full" required {...register("genre")}>
          <option hidden value={""}>Select Genre</option>
          {
            bookGenres.map(genre=> (
              <option value={genre}>{genre}</option>
            ))
          }
        </select>
        {/* <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Genre"
          {...register("genre")}
        /> */}
        <label className="block">Published Date</label>
        <input
        required
        type="date"
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Genre"
          {...register("date")}
        />

        <span className={`${success ? "opacity-1": "opacity-0"} text-right text-green-600 font-bold block`}>Book Added SuccessFully</span>
        {
          isLoading && <DotLoading size={"10px"}/>
        }
        {
          isError &&
        <span>Something went wrong</span>
        }
        <div className="block text-right">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-purple-400 px-4 py-2 text-white shadow-md mt-2 hover:bg-purple-600 hover:color-white disabled:bg-purple-100"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
