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
      isLoading &&  <DotLoading size='50px'/>
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
