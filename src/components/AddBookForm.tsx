import * as React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  bookTitle: string;
  lastName: string;
};

export default function AddBookForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));
  // firstName and lastName will have correct type

  return (
    <div className="m-auto w-[600px]">
      <form onSubmit={onSubmit}>
        <label className="block">Book Title</label>
        <input
          className="border rounded focus:outline-none py-2 w-[300px]"
          placeholder="Book Title"
          {...register("bookTitle")}
        />

        <label className="block">Book Title</label>
        <input
          className="border rounded focus:outline-none py-2 w-[300px]"
          placeholder="Book Title"
          {...register("bookTitle")}
        />

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
