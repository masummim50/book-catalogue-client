/* eslint-disable @typescript-eslint/no-unused-vars */

import React , { useEffect }from 'react' 
import './App.css'
import AppRouter from './AppRouter'
import { useVerifyTokenMutation } from './redux/features/user/userApi'

function App() {

  const [verifyToken, {isLoading, isError, isSuccess, data}] = useVerifyTokenMutation();

  useEffect(()=> {
    verifyToken(undefined)
  }, [])

  console.log("app rendering")
  return (
    <>
    {
      isLoading && <p>loading...</p>
    }{
      (isSuccess || isError) && 
    <AppRouter/>
    }
      
    </>
  )
}

export default App
