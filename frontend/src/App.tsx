import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignup from "./pages/UserSignup"
import CaptianLogin from "./pages/CaptianLogin"
import CaptainSignup from "./pages/CaptainSignup"
import { useContext } from "react"
import { UserDataContext } from "./context/UserContext"


function App() {

   const ans = useContext(UserDataContext)


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignup/>} />
        <Route path="/captain-login" element={<CaptianLogin/>} />
        <Route path="/captain-signup" element={<CaptainSignup/>} />
      </Routes>
    </div>
  )
}

export default App
