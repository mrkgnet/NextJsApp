
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const sendRequestHandler = async() => {
    // send request to server with email and password
    console.log(email, password);
    }

  return (
    <div className="min-h-screen  flex items-center justify-center ">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center  mb-8">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="email">
              ایمیل
            </label>
            <input
              className="w-full  border border-gray-600 rounded-lg py-2 px-4  focus:outline-none focus:border-blue-500"
              value={email}
              type="email"
              id="email"
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 mb-2" htmlFor="password">
              پسورد
            </label>
            <input
              className="w-full  border border-gray-600 rounded-lg py-2 px-4  focus:outline-none focus:border-blue-500"
              type="password"
              value={password}
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button 
            className="w-full text-white bg-blue-600 hover:bg-blue-700  font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
            type="submit"
            onClick={sendRequestHandler}
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
