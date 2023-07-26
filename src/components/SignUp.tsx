
import { useForm } from "react-hook-form";
import React from 'react';

type FormData = {
  email: string;
  password: string;
};

const SignUp = () => {
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="mx-auto w-[600px] ">
      <form onSubmit={onSubmit}>
      <label className="block">Name</label>
        <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Enter Your Name"
          {...register("email")}
        />
        <label className="block">email</label>
        <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Enter Your Email"
          {...register("email")}
        />

        <label className="block">Password</label>
        <input
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Enter your password"
          {...register("password")}
        />

        <div className="block text-right">
          <button type="submit" className="bg-purple-400 px-4 py-2 text-white shadow-md mt-2 hover:bg-purple-600 hover:color-white">Login</button>
        </div>
      </form>
    </div>
  );
}


export default SignUp;


