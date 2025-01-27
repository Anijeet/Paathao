import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <div className=" bg-cover bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex flex-col justify-between bg-red-500 pt-8">
        <img className="w-16 ml-8  " src="\public\Pathao-logo.svg" alt="" />
        <div className="bg-white py-5 pb-5 px-5">
          <h2 className="text-2xl font-bold">Welcome to Pathao</h2>
          <Link to="/login" className=" flex items-center justify-center w-full bg-red-500 text-white p-2 rounded-lg text-lg  mt-2">Get Started</Link>
        </div>
      </div>
    </div>
  )
}

export default Home