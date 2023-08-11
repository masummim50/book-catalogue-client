import { useForm } from "react-hook-form";
import React, {useEffect, useState} from "react";
import { useSignupMutation } from "../redux/features/user/userApi";
import { useNavigate } from "react-router-dom";
import DotLoading from "../ui/DotLoading";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {

  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUp, { isError, isSuccess, isLoading, data:signupdata, error }] = useSignupMutation();
  useEffect(()=> {
    if(isError && error?.data?.message.split(" ")[0] === "E11000"){
      setEmailError(true)
      setTimeout(() => {
        setEmailError(false);
      }, 1000);
    }

    if(isSuccess){
      setSignUpSuccess(true);
      setTimeout(() => {
        navigate("/login")
      }, 500);
    }
    reset()
  },[isError, error, isSuccess])
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    signUp(data);
  });

  useEffect(()=> {
    console.log(isError, isSuccess, isLoading, signupdata);

  },[signupdata])

  return (
    <div className="mx-auto w-[600px] min-h-[60vh]">
      {
        emailError && <span className="text-red-700 font-bold">Email already exists</span>
      }
      <form onSubmit={onSubmit}>
        <label className="block">Name</label>
        <input
          required
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Enter Your Name"
          {...register("name")}
        />
        <label className="block">email</label>
        <input
        required
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Enter Your Email"
          {...register("email")}
        />

        <label className="block">Password</label>
        <input
        required
          className="border rounded focus:outline-none py-2 w-full"
          placeholder="Enter your password"
          {...register("password")}
        />

        <div className="block text-right">
          {
            signUpSuccess && <span className="text-green-700 font-bold">Sign up Successfull</span>
          }
          
          <br/>
          <div className={`my-2 flex justify-end ${isLoading ? "": "invisible"}`}>
            <DotLoading size={"12px"}/>
          </div>
          <button
            type="submit"
            className="bg-purple-400 px-4 py-2 text-white shadow-md mt-2 hover:bg-purple-600 hover:color-white"
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
