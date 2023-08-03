/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../redux/features/book/bookApi";

type FormData = {
  title: string;
  author: string;
  genre: string;
  date: string;
};

export default function EditBookForm() {

  const [success, setSuccess] = useState(false);
  const [addBook, {isSuccess}] =
    useAddBookMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
  }, [isSuccess])

  return (
    <div className="mx-auto w-[600px] ">
      <form onSubmit={onSubmit}>
        <label className="block">Book Title</label>
        <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Title"
          {...register("title")}
        />

        <label className="block">Book Author</label>
        <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Author"
          {...register("author")}
        />
        <label className="block">Book Genre</label>
        <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Genre"
          {...register("genre")}
        />
        <label className="block">Book Genre</label>
        <input
        type="date"
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Genre"
          {...register("date")}
        />

        <span className={`${success ? "opacity-1": "opacity-0"} text-right text-green-600 font-bold block`}>Book Added SuccessFully</span>
        <span>Something went wrong</span>
        <div className="block text-right">
          <button
            type="submit"
            className="bg-purple-400 px-4 py-2 text-white shadow-md mt-2 hover:bg-purple-600 hover:color-white"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
