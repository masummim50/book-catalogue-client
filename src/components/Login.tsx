
import { useForm } from "react-hook-form";
import React, { useEffect } from 'react';
import { useLoginMutation } from "../redux/features/user/userApi";
import { setUser } from "../redux/features/user/userSlice";
// import { useDispatch } from 'react-redux';
import { useAppDispatch } from "../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};


const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const {state} = useLocation();
    console.log("state", state)


    const [login, { isSuccess, data, isError, error}] = useLoginMutation();

    useEffect(()=> {
        console.log(data)
        if(isSuccess && data){
            dispatch(setUser(data.data));
            // localStorage.setItem("bookClubAuth", JSON.stringify(data.data))
            localStorage.setItem("token", data.data.accessToken);
            if(state){
              navigate(state)
            }else{
              navigate("/")
            }
        }
    }, [data, isSuccess])

    useEffect(()=> {
      if(isError){
        console.log(error, "error message")
      }
    },[isError, error])
    
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    login(data)
  });

  return (
    <div className="mx-auto w-[600px] ">
      {
        isError &&
        <p className="text-red-600">{error.data.message}</p>
      }
      <form onSubmit={onSubmit}>
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


export default Login;


