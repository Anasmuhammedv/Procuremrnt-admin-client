
import React, { useState } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post('api/login', { email, password });
      if(response.status==200){
        alert('Login successful:');
        navigate('/Dashboard')
        console.log(response);
      }
     
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      alert('error')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600">
      <div className="w-full max-w-xs">
        <div className="flex justify-center mb-8">
          <FaShoppingCart className="text-white text-6xl" />
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            LOGIN
          </button>
          <div className="mt-4 text-center">
            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
