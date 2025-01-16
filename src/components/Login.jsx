import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';



const Login = ({ setToken }) => {

  const [email, setEmail] = useState('admin@forever.com');
  const [password, setPassword] = useState('admin@1999');

  const submitHandler = async (event) => {
    try {
      console.log('form Submitted')
      event.preventDefault();
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
      console.log('response', response?.data);
      if(response?.data?.success){
        setToken(response.data?.token);
      }else{
        toast.error(response?.data?.error || 'Internal Server Error');
      }

    } catch (error) {
      console.log('error', error?.response?.data?.error);
      toast.error(error?.response?.data?.error);
    }
  }

  const handleChange = (event) => {

    const name = event.target.name,
      value = event.target.value;
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='rounded-md bg-white shadow-md px-8 py-2 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={submitHandler}>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input name='email' value={email} onChange={handleChange} className='rounded-md px-3 py-2 w-full border border-gray-300 outline-none' type="email" placeholder='Enter Your Email' required />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input name='password' value={password} onChange={handleChange} className='rounded-md px-3 py-2 w-full border border-gray-300 outline-none' type="password" placeholder='Enter Your Password' required />
          </div>
          <button className='my-2 w-full rounded-md py-2 px-4 text-white bg-black' >Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
