/* eslint-disable @typescript-eslint/no-unused-vars */

import React , { useEffect }from 'react' 
import './App.css'
import AppRouter from './AppRouter'
import { useAppDispatch } from './redux/hooks'
import { setUser } from './redux/features/user/userSlice'
import { useVerifyTokenMutation } from './redux/features/user/userApi'

function App() {
  const dispatch = useAppDispatch()

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
      isSuccess || isError &&
    <AppRouter/>
    }
      
    </>
  )
}

export default App
