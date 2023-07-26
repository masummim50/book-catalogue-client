/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  bookTitle: string;
  bookAuthor: string;
  bookGenre: string;
};

export default function AddBookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="mx-auto w-[600px] ">
      <form onSubmit={onSubmit}>
        <label className="block">Book Title</label>
        <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Title"
          {...register("bookTitle")}
        />

        <label className="block">Book Author</label>
        <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Author"
          {...register("bookAuthor")}
        />
        <label className="block">Book Genre</label>
        <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Type Book Genre"
          {...register("bookGenre")}
        />

        <div className="block text-right">
          <button type="submit" className="bg-purple-400 px-4 py-2 text-white shadow-md mt-2 hover:bg-purple-600 hover:color-white">Add Book</button>
        </div>
        {/* <button
        type="button"
        onClick={() => {}}
        >
        SetValue
      </button> */}
      </form>
    </div>
  );
}
