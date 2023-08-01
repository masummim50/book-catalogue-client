/* eslint-disable @typescript-eslint/no-unused-vars */

import React , { useEffect, useState }from 'react' 
import './App.css'
import AppRouter from './AppRouter'
import { useVerifyTokenMutation } from './redux/features/user/userApi'

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
      isLoading && <p>loading...</p>
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
