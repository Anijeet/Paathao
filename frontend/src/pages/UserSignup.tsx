import { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {

  const [firstName,setfirstName]=useState("")
  const [lastName,setlastName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const[userData, setUserData]=useState({})


  const submitHandler=(e:any)=>{
    e.preventDefault();
    setUserData({fullName:{firstname:firstName,lastname:lastName}, email:email,password:password})
    setEmail('')
    setPassword('')
    setfirstName('')
    setlastName('')
  }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
      <img className="w-16 mb-8 " src="/pathoo.png" alt="" />
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>

        <h3 className="text-lg font-medium mb-2 ">What's your Name</h3>
          <div className="w-full flex gap-4">
          <input value={firstName} onChange={(e)=>{
            setfirstName(e.target.value)
          }}
            className="bg-[#eeee] py-2 px-4 mb-5 placeholder:text-base border w-1/2 text-lg outline-gray-900 "
            type="text"
            placeholder="firstname"
          />

          <input value={lastName} onChange={(e)=>{
            setlastName(e.target.value)
          }}
            className="bg-[#eeee] py-2 px-4 mb-5 placeholder:text-base border w-1/2 text-lg outline-gray-900 "
            type="text"
            placeholder="lastname"
          />

          </div>

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
          Already had account ?{" "}
          <Link className="text-red-400" to={"/login"}>
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[12px] leading-tight opacity-80">By proceeding you consent to get Emails from Paatho and it is affiliated to the email provided.</p>
      </div>
    </div>
  );
};

export default UserSignup;
