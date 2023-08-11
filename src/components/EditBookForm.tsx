/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";
import { bookGenres } from "./AddBookForm";
import DotLoading from "../ui/DotLoading";

type FormData = {
  title: string;
  author: string;
  genre: string;
  date: string;
};

export default function EditBookForm() {
  
  // check if form has been edited or not
  
  
  
  
  const { id } = useParams();
  const { data, isSuccess } = useGetBookByIdQuery(id);
  const [bookRetrieved, setBookRetrieved] = useState(false);
  const [updateBook, {isSuccess:bookUpdateSuccess, isLoading:bookupdateLoading}] = useUpdateBookMutation()

  useEffect(() => {
    if (isSuccess) {
      setBookRetrieved(true);
    }
  }, [isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormData>({defaultValues: {
    title: data.data.title || "",
    author: data.data.author || "",
    genre: data.data.genre || "",
    date: data.data.date ? new Date(data.data.date).toISOString().substr(0, 10) : "",
  },});

  const onSubmit = handleSubmit((data) => {
    updateBook({id, data})
    console.log(data)
  });

  // to show success message

  return (
    <>
      {bookRetrieved ? (
        <div className="mx-auto w-[600px] ">
          <form onSubmit={onSubmit}>
            <label className="block">Book Title</label>
            <input
              defaultValue={data.data.title}
              className="border rounded focus:outline-none py-2 w-full"
              placeholder="Type Book Title"
              {...register("title")}
            />

            <label className="block">Book Author</label>
            <input
              defaultValue={data.data.author}
              className="border rounded focus:outline-none py-2 w-full"
              placeholder="Type Book Author"
              {...register("author")}
            />
            <label className="block">Book Genre</label>
            <select className="border rounded focus:outline-none py-2 w-full" {...register("genre")}>
          <option hidden value={""}>Select Genre</option>
          {
            bookGenres.map(genre=> (
              <option value={genre}>{genre}</option>
            ))
          }
        </select>
            <label className="block">Book Genre</label>
            <input
              defaultValue={data.data.date ? new Date(data.data.date).toISOString().substr(0, 10) : ''}
              type="date"
              className="border rounded focus:outline-none py-2 w-full"
              placeholder="Type Book Genre"
              {...register("date")}
            />

            <span
              className={`${
                bookUpdateSuccess ? "opacity-1" : "opacity-0"
              } text-right text-green-600 font-bold block`}
            >
              Book Updated SuccessFully
            </span>
            <div className={`my-2 flex justify-end ${bookupdateLoading ? "": "invisible"}`}>
              <DotLoading size={"10px"}/>
            </div>
            {/* <span>Something went wrong</span> */}
            <div className="block text-right">
              <button
                disabled={!isDirty || bookupdateLoading}
                type="submit"
                className="bg-purple-400 px-4 py-2 text-white shadow-md mt-2 hover:bg-purple-600 hover:color-white rounded-lg disabled:hover:bg-purple-100 disabled:bg-purple-100"
              >
                Update book
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
