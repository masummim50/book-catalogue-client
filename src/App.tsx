

import { useEffect } from 'react'
import './App.css'
import AppRouter from './AppRouter'
import { useAppDispatch } from './redux/hooks'
import { setUser } from './redux/features/user/userSlice'
import jwt from 'jsonwebtoken'

function App() {
  const dispatch = useAppDispatch()

  useEffect(()=> {
    const data = localStorage.getItem("bookClubAuth")
    const token = localStorage.getItem("token");
    if(token){
      const decoded = jwt.verify(token, import.meta.env.VITE_JWT_SECRET_KEY);
      console.log(decoded)
      console.log(import.meta.env.VITE_JWT_SECRET_KEY, "consoling token")
    }
    if(data){
      const userData = JSON.parse(data);
      dispatch(setUser(userData))
      console.log("dispatched set user")
    }
    
  },[])

  return (
    <>
      <AppRouter/>
    </>
  )
}

export default App
