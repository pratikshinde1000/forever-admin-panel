import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-1 rounded-l' >
                    <img src={assets.add_icon} className='h-5 w-5' alt="" />
                    <p className='hidden md:block'>Add Item</p>
                </NavLink>

                <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-1 rounded-l'>
                    <img src={assets.order_icon} className='h-5 w-5' alt="" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>

                <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-1 rounded-l'>
                    <img src={assets.order_icon} className='h-5 w-5' alt="" />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar
