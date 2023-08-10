/* eslint-disable @typescript-eslint/no-unused-vars */

import React , { useEffect, useState }from 'react' 
import './App.css'
import AppRouter from './AppRouter'
import { useVerifyTokenMutation } from './redux/features/user/userApi'
import DotLoading from './ui/DotLoading';

function App() {

  const [verifyToken, {isLoading, isError, isSuccess, data}] = useVerifyTokenMutation();
  const [token, setToken] = useState("")
  
  useEffect(()=> {
    const token = localStorage.getItem("token");
    if(token){
      setToken(token)
      verifyToken(undefined)
    }
  }, [])

  return (
    <>
    {
      isLoading && <div className='flex justify-center items-center min-h-[100vh] flex-col'>
        <DotLoading size='50px'/>
        <h2 className='text-[30px] text-orange-700'> First time, server may take a while to start up</h2>
      </div> 
    }
    {
      !token && <AppRouter/>
    }
    {
      ((isSuccess || isError)) &&
    <AppRouter/>
    }
      
    </>
  )
}

export default App
