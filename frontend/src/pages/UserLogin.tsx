import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const[userData, setUserData]=useState({})


  const submitHandler=(e:any)=>{
    e.preventDefault();
    setUserData({email:email,password:password})
    console.log(userData)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
      <img className="w-16 mb-8 " src="\public\pathoo.png" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <h3 className="text-lg font-medium mb-2 ">Continue with Email</h3>
          <input value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }}
            className="bg-[#eeee] py-2 px-4 mb-5 placeholder:text-base border w-full text-lg outline-gray-900 "
            type="email"
            placeholder="email@mail.com"
          />

          <h3 className="text-lg font-medium mb-2 ">Password</h3>
          <input  value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}
            className="bg-[#eeee] py-2 px-4 mb-7 placeholder:text-base border w-full text-lg outline-gray-900 "
            type="password"
            placeholder="123@123"
          />

          <button className="bg-black text-white font-semibold mb-2 px-4 py-2 w-full rounded text-lg ">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link className="text-red-400" to={"/signup"}>
            Register
          </Link>
        </p>
      </div>
      <div>
        <Link to={"/captain-login"} className="bg-red-400 flex items-center justify-center text-white font-semibold mb-1 px-4 py-2 w-full rounded text-lg ">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
