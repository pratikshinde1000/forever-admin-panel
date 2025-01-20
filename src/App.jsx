import { jwtDecode } from "jwt-decode";
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';


const Add = lazy(() => import('./pages/Add'));
const Orders = lazy(() => import('./pages/Orders'));
const List = lazy(() => import('./pages/List'));


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');


  useEffect(() => {
    if(token){
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const check =  decodedToken.exp < currentTime;
      console.log('check', check);
      if(check){
        localStorage.removeItem('token');
        setToken('');
      }
    }
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>

      <>
        <ToastContainer />

        {
          token === '' ? <Login setToken={setToken} /> :
            <>
              <Navbar setToken={setToken} />
              <hr />
              <div className='flex w-full'>
                <Sidebar />
                <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base' >
                  <Suspense fallback={<h1>Loading....</h1>}>
                    <Routes>
                      <Route path='/add' element={<Add token={token} />} />
                      <Route path='/orders' element={<Orders token={token} />} ></Route>
                      <Route path='/list' element={<List token={token} />} ></Route>
                    </Routes>
                  </Suspense>
                </div>
              </div>
            </>
        }

      </>

    </div>

  )
}

export default App
